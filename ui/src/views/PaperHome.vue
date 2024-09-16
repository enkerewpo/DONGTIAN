<script>
import { ref, onMounted } from 'vue';
import api from '@/util/api';
import { useGlobalConfig, VaSelect } from 'vuestic-ui';
import { ui_log } from '@/util/log';

// Define a reference for storing the paper entries data.
const papers = ref([]);

let category_list = [];
let map_category_to_color = {};

function random_color(str) {
    // hash the string to a number, so that the color is determined by the string
    let hash = 0;
    if (str == null || str.length == 0) str = "default";
    let len = str.length;
    for (let i = 0; i < len; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    // generate a random color
    let c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
}

function authors2list(authors_str) {
    // [author1 name@affiliation1][author2 name@affiliation2]...
    // if undefined, return []
    if (authors_str == undefined || authors_str == null) {
        return [];
    }
    let authors = [];
    let author_list = authors_str.split("]");
    for (let i = 0; i < author_list.length; i++) {
        let author = author_list[i];
        if (author.length === 0) {
            continue;
        }
        let author_name = author.split("[")[1].split("@")[0];
        authors.push(author_name);
    }
    // if more than 3 authors, only show the first 3
    if (authors.length > 3) {
        authors = authors.slice(0, 3);
        authors.push("...");
    }
    return authors;
}

function authors2affiliations(authors_str) {
    // [author1 name@affiliation1][author2 name@affiliation2]...
    // if undefined, return []
    if (authors_str === undefined || authors_str === null) {
        return [];
    }
    let affiliations = [];
    let author_list = authors_str.split("]");
    for (let i = 0; i < author_list.length; i++) {
        let author = author_list[i];
        if (author.length === 0) {
            continue;
        }
        let author_name = author.split("[")[1].split("@")[0];
        let author_affiliation = author.split("[")[1].split("@")[1];
        // if affiliation has comma, just use the first one
        if (author_affiliation.includes(",")) {
            author_affiliation = author_affiliation.split(",")[0];
        }
        affiliations.push(author_affiliation);
    }
    // remove duplicates
    affiliations = [...new Set(affiliations)];
    if (affiliations.length > 2) {
        affiliations = affiliations.slice(0, 2);
        affiliations.push("...");
    }
    return affiliations;
}

function process(data) {
    console.log("process data, length:", data.length);
    let r = [];
    category_list = [];
    for (let i = 0; i < data.length; i++) {
        let entry = data[i];
        let authors_str = entry.authors;
        let authors = authors2list(authors_str);
        let affiliations = authors2affiliations(authors_str);
        let keywords_str = entry.keywords;
        let has_pdf = entry.has_pdf;
        let pdf_open_url = "/api/get_pdf/" + entry.id;
        let abstract_open_url = "/api/get_abstract/" + entry.id;
        let category = entry.category;
        let ccs_concepts = entry.ccs;
        if (!category_list.includes(category)) {
            category_list.push(category);
            map_category_to_color[category] = random_color(category);
        }
        // https://doi.org/10.1145/3385412.3385980 to 10.1145/3385412.3385980
        if (entry.doi === undefined || entry.doi === null) {
            entry.doi = "NO DOI";
        }
        let doi_num = entry.doi.split("/").slice(-1)[0];
        r.push({
            id: entry.id,
            title: entry.title,
            parent: entry.parent,
            year: entry.year,
            doi: entry.doi,
            doi_num: doi_num,
            authors: authors,
            affiliations: affiliations,
            keywords: keywords_str,
            has_pdf: has_pdf,
            category: category,
            category_color: map_category_to_color[category],
            ccs: ccs_concepts,
            pdf_open_url: pdf_open_url,
            abstract_open_url: abstract_open_url,
        });
    }

    return r;
}

function getLocalStorage(key, null_value = null) {
    let value = localStorage.getItem(key);
    if (value === null) {
        console.log("getLocalStorage: key not found:", key, "returning:[", null_value, "](type:", typeof null_value, ")");
        return null_value;
    }
    console.log("getLocalStorage:", key, value);
    return value;
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
    console.log("setLocalStorage:",
        key, value, localStorage.getItem(key));
}

export default {
    setup() {
        const global_config = useGlobalConfig();
        const minimized = ref(false);

        const checkScreenWidth = () => {
            minimized.value = window.innerWidth < 768;
            console.log("minimized", minimized.value);
        };

        // Fetch the paper entries data when the component is mounted.
        onMounted(async () => {
            try {
                console.log("fetching paper entries");
                const response = await api.get('get_paper_entries');
                let r = process(response.data);
                papers.value = r;
            } catch (error) {
                console.error("Error fetching paper entries:", error);
            }

            try {
                console.log("triggering transaction to update has_pdf field");
                const response = await api.post('transaction_has_pdf');
                console.log(response);
            } catch (error) {
                console.error("Error triggering transaction to update has_pdf field:", error);
            }

            checkScreenWidth();
            window.addEventListener('resize', checkScreenWidth);
        });

        return {
            global_config,
            papers,
            minimized,
        };
    },
    data() {
        return {
            items: [
                { title: "主页", icon: "dashboard", url: "/" },
                { title: "论文列表", icon: "book", active: true, url: "/papers" },
                { title: "关于", icon: "info", url: "/about" },
            ],
            search_title: getLocalStorage("search_title", ""),
            search_ccs: getLocalStorage("search_ccs", ""),
            search_category: getLocalStorage("search_category", ""),
            search_affiliation: getLocalStorage("search_affiliation", ""),
            sorted_by: "year", // support year and parent
            sorted_order: "desc", // "asc" or "desc" if possible
            tmp_pdf_upload_id: null,
            tmp_pdf_file: null,
            current_frame: parseInt(getLocalStorage("current_frame", 0)),
            entries_per_frame: 9,
        };
    },
    computed: {
        getCheckList: function () {
            return [this.search_title, this.search_ccs, this.search_category, this.search_affiliation];
        },
        getPapers: function () {
            let check_list = this.getCheckList;
            let ret = [];
            let filtered = [];
            console.log("getPapers: check_list:", check_list);
            if (check_list.every(e => e === "")) {
                ret = this.papers;
            } else {
                if (this.search_title === "") {
                    filtered = this.papers;
                } else {
                    filtered = this.papers.filter(p => p.title.toLowerCase().includes(this.search_title.toLowerCase()));
                }
                // console.log("filtered:", filtered);
                if (this.search_ccs === "") {
                    ret = filtered;
                } else {
                    console.log("filtered length:", filtered.length);
                    // if css is empty for the paper, it will not be shown
                    for (let i = 0; i < filtered.length; i++) {
                        let p = filtered[i];
                        if (p.ccs === null) {
                            continue;
                        }
                        // console.log("p.ccs:", p.ccs);
                        if (p.ccs.toLowerCase().includes(this.search_ccs.toLowerCase())) {
                            ret.push(p);
                        }
                    }
                }
                // filter by category if not empty
                if (this.search_category !== "") {
                    ret = ret.filter(p => p.category === this.search_category);
                }
                console.log("ret length after category:", ret.length);
                // filter by affiliation if not empty
                if (this.search_affiliation !== "") {
                    ret = ret.filter(p => {
                        let a = p.affiliations;
                        for (let i = 0; i < a.length; i++) {
                            if (a[i].toLowerCase().includes(this.search_affiliation.toLowerCase())) {
                                return true;
                            }
                        }
                        return false;
                    });
                }
                console.log("ret length after affiliation:", ret.length);
            }
            // then check sorted_by
            let ret2 = ret;
            // if year is the same, sort by title
            if (this.sorted_by === "year") {
                if (this.sorted_order === "desc") {
                    ret2.sort((a, b) => {
                        if (a.year === b.year) {
                            return a.title.localeCompare(b.title);
                        }
                        return b.year - a.year;
                    });
                } else {
                    ret2.sort((a, b) => {
                        if (a.year === b.year) {
                            return a.title.localeCompare(b.title);
                        }
                        return a.year - b.year;
                    });
                }
            } else {
                // default sort by has pdf
                ret2.sort((a, b) => b.has_pdf - a.has_pdf);
            }
            this.reset(ret2.length);
            return ret2;
        },
        getPapersAtFrame: function () {
            // return the papers at the frame index
            console.log("getPapersAtFrame:", this.current_frame);
            let frame_idx = this.current_frame;
            let start = frame_idx * this.entries_per_frame;
            let end = start + this.entries_per_frame;
            let result = this.getPapers.slice(start, end);
            console.log("getPapersAtFrame:", frame_idx, start, end, result);
            return result;
        },
        getCurrentCategoryList: function () {
            let papers = this.getPapers;
            let category_list = [];
            for (let i = 0; i < papers.length; i++) {
                let category = papers[i].category;
                if (!category_list.includes(category)) {
                    category_list.push(category);
                }
            }
            return category_list;
        },
        getMaxFrame: function () {
            // return the max frame index
            let total = this.getPapers.length;
            let max_frame = Math.floor(total / this.entries_per_frame);
            if (total % this.entries_per_frame !== 0) {
                max_frame += 1;
            }
            return max_frame;
        },
    },
    methods: {
        getMaxFrameUtil: function (total) {
            // return the max frame index
            let max_frame = Math.floor(total / this.entries_per_frame);
            if (total % this.entries_per_frame !== 0) {
                max_frame += 1;
            }
            return max_frame;
        },
        reset: function (curent_papers_count) {
            // if any search condition is not empty, reset the current frame to 0
            let candidate = this.getCheckList;
            let flag = false;
            for (let i = 0; i < candidate.length; i++) {
                if (candidate[i] !== "") {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                // if the value in local storage is within max frame, use that
                let frame = getLocalStorage("current_frame", 0);
                let max_frame = this.getMaxFrameUtil(curent_papers_count);
                if (frame <= max_frame) {
                    this.setCurrentFrame(frame);
                } else {
                    this.setCurrentFrame(0);
                }
                console.log("reset: current_frame -> ", frame, " max_frame -> ", max_frame);
            }
        },
        toggleSidebar: function () {
            this.minimized = !this.minimized;
        },
        openPdf: function (pdf_open_url) {
            console.log(pdf_open_url);
            window.open(pdf_open_url, '_blank');
        },
        uploadPdf: function (id) {
            // click the file upload input
            let fi = this.$refs.fileInput;
            console.log(fi);
            this.tmp_pdf_upload_id = id;
            console.log("uploadPdf:", id);
            fi.click();
        },
        removePdf: function (id) {
            // remove the pdf file
            let url = "/post_rm_pdf/" + id;
            console.log("removing pdf file:", url);
            api.post(url).then(response => {
                console.log(response);
                ui_log("PDF已删除");
                this.forceRefresh();
            }).catch(error => {
                console.error("Error removing PDF:", error);
                ui_log("PDF删除失败");
            });
        },
        gotoNextFrame: function () {
            // go to the next frame
            if (this.current_frame < this.getMaxFrame - 1) {
                this.setCurrentFrame(this.current_frame + 1);
            }
        },
        gotoPrevFrame: function () {
            // go to the previous frame
            if (this.current_frame > 0) {
                this.setCurrentFrame(this.current_frame - 1);
            }
        },
        jumpToFrame: function (frame) {
            // jump to the frame
            this.setCurrentFrame(frame - 1);
        },
        setCurrentFrame: function (frame) {
            if (typeof frame !== "number") {
                console.warn("setCurrentFrame: frame is not a number:", frame);
                frame = parseInt(frame);
                console.log("setCurrentFrame: frame is converted to:", frame);
            }
            console.log("setCurrentFrame:", frame);
            this.current_frame = frame;
            // store the current frame to local storage
            localStorage.setItem("current_frame", frame);
        },
        addOnePaperEntry: function () {
            // api/add_one
            // this will add a default paper entry with YEAR 2099
            api.post('add_one').then(response => {
                console.log(response);
                let id = response.data.id;
                // jump to /edit_paper/{id}
                this.$router.push("/edit_paper/" + id);
                this.forceRefresh();
                ui_log("已添加一条记录");
            }).catch(error => {
                console.error("Error adding one paper entry:", error);
                ui_log("添加失败");
            });
        },
        getTitleById: function (id) {
            for (let i = 0; i < this.papers.length; i++) {
                if (this.papers[i].id === id) {
                    return this.papers[i].title;
                }
            }
            return "Unknown";
        },
        onFileChange: function (e) {
            this.tmp_pdf_file = e.target.files[0];
            console.log("onFileChange:", this.tmp_pdf_file);
            // upload the file, POST["pdf"] = pdf_binary_data
            let id = this.tmp_pdf_upload_id;
            let url = "/post_pdf/" + id;
            console.log("uploading file to:", url);
            let reader = new FileReader();
            reader.readAsArrayBuffer(this.tmp_pdf_file);
            let formData = new FormData();
            formData.append("pdf", this.tmp_pdf_file);
            api.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response);
                ui_log("PDF已上传");
                this.forceRefresh();
            }).catch(error => {
                console.error("Error uploading PDF:", error);
                ui_log("PDF上传失败");
            });
        },
        triggerGen: function (id) {
            // trigger the GEN process for the paper
            // api url: /api/post_gen/{id}
            const url = "/post_gen/" + id;
            api.post(url).then(response => {
                console.log(response);
                ui_log("GPT生成已完成");
                this.forceRefresh();
            }).catch(error => {
                console.error("Error triggering GEN process:", error);
                ui_log("GPT生成失败");
            });
        },
        removeGen: function (id) {
            // remove the GEN file
            let url = "/post_rm_gen/" + id;
            console.log("removing GEN file:", url);
            api.post(url).then(response => {
                console.log(response);
                ui_log("GEN已删除");
                this.forceRefresh();
            }).catch(error => {
                console.error("Error removing GEN:", error);
                ui_log("GEN删除失败");
            });
        },
        openAbstract: function (abstract_open_url) {
            console.log(abstract_open_url);
            window.open(abstract_open_url, '_blank');
        },
        sort_year_next: function () {
            // state transition: "" -> "year_desc" -> "year_desc" -> ""
            if (this.sorted_by === "") {
                this.sorted_by = "year";
                this.sorted_order = "desc";
            } else if (this.sorted_by === "year") {
                if (this.sorted_order === "desc") {
                    this.sorted_order = "asc";
                } else {
                    this.sorted_by = "";
                    this.sorted_order = "desc";
                }
            }
        },
        sort_year_state: function () {
            // 1. ""
            // 2. "year_desc"
            // 3. "year_asc"
            if (this.sorted_by === "") {
                return 1;
            } else if (this.sorted_by === "year") {
                if (this.sorted_order === "desc") {
                    return 2;
                } else {
                    return 3;
                }
            }
        },
        state2icon: function (state) {
            if (state === 1) {
                return "";
            } else if (state === 2) {
                return "arrow_drop_up";
            } else if (state === 3) {
                return "arrow_drop_down";
            }
        },
        forceRefresh: function () {
            console.log("forceRefresh");
            api.defaults.baseURL = '/api';
            api.get('get_paper_entries').then(response => {
                let r = process(response.data);
                this.papers = r;
                ui_log("已刷新");
            }).catch(error => {
                console.error("Error fetching paper entries:", error);
                ui_log("刷新失败");
            });
        },
        forceRunTransactionHasPdf: function () {
            // force run the transaction to update the has_pdf field
            const url = "/transaction_has_pdf";
            api.post(url).then(response => {
                console.log(response);
                ui_log("已触发数据库更新PDF状态流程");
                this.forceRefresh();
            }).catch(error => {
                console.error("Error triggering update has_pdf process:", error);
                ui_log("更新PDF状态失败");
            });
        },
        onChangeSearchTitle: function () {
            console.log("onChangeSearchTitle:", this.search_title);
            setLocalStorage("search_title", this.search_title);
        },
        onChangeSearchCategory: function () {
            console.log("onChangeSearchCategory:", this.search_category);
            setLocalStorage("search_category", this.search_category);
        },
        clearSearchByCategory: function () {
            console.log("clearSearchByCategory");
            this.search_category = "";
            setLocalStorage("search_category", "");
        },
        ayncUpdateAllMetadata: function () {
            // trigger the update metadata process for all papers
            const url = "/update_all_metadata";
            api.post(url).then(response => {
                console.log(response);
                ui_log("元数据更新已触发，后台异步处理中");
                this.forceRefresh();
            }).catch(error => {
                console.error("Error triggering update metadata process:", error);
                ui_log("元数据更新失败");
            });
        },
        ayncUpdateAllPDF: function () {
            // trigger the update pdf process for all papers
            const url = "/update_all_pdf";
            api.post(url).then(response => {
                console.log(response);
                ui_log("PDF更新已触发，后台异步处理中");
                this.forceRefresh();
            }).catch(error => {
                console.error("Error triggering update pdf process:", error);
                ui_log("PDF更新失败");
            });
        },
        ayncUpdateAllGen: function () {
            // trigger the update gen process for all papers
            const url = "/update_all_gen";
            api.post(url).then(response => {
                console.log(response);
                ui_log("GEN更新已触发，后台异步处理中");
                this.forceRefresh();
            }).catch(error => {
                console.error("Error triggering update gen process:", error);
                ui_log("GEN更新失败");
            });
        },
    },
};
</script>

<template>

    <div class="app">

        <div class="content">
            <div class="table-container">
                <!-- add a filter input row for Each column -->
                <div class="va-input-group mb-1">
                    <VaButton @click="ayncUpdateAllMetadata" class="mr-2" border-color="primary" size="small">
                        自动获取全部元数据（CROSSREF）
                    </VaButton>
                    <VaButton @click="ayncUpdateAllPDF" class="mr-2" border-color="primary" size="small">
                        自动获取全部PDF（SCIHUB）
                    </VaButton>
                    <VaButton @click="ayncUpdateAllGen" class="mr-2" border-color="primary" size="small">
                        自动获取全部GEN（GPT4）
                    </VaButton>
                    <VaButton @click="forceRunTransactionHasPdf" class="mr-2" border-color="primary" size="small">
                        更新PDF状态
                    </VaButton>
                </div>
                <div class="va-input-group mb-2 mt-2">
                    <VaButton @click="addOnePaperEntry()" preset="primary" class="mr-2" border-color="primary"
                        icon="add">
                    </VaButton>
                    <VaButton @click="forceRefresh()" preset="primary" class="mr-2" border-color="primary"
                        icon="refresh">
                    </VaButton>
                    <!-- frame navigation -->
                    <VaButton @click="gotoPrevFrame()" preset="primary" class="mr-2" border-color="primary"
                        icon="arrow_back">
                    </VaButton>
                    <!-- current frame index -->
                    <div class="mr-2" style="display: inline-block; padding: 0.3rem">
                        <span>{{ current_frame + 1 }} / {{ getMaxFrame }}</span>
                    </div>
                    <VaButton @click="gotoNextFrame()" preset="primary" class="mr-2" border-color="primary"
                        icon="arrow_forward">
                    </VaButton>
                    <VaInput placeholder="按标题查询" v-model="search_title" class="mr-2" @change="onChangeSearchTitle" />
                    <!-- <VaInput placeholder="按分类查询" v-model="search_category" class="mr-2" /> -->
                    <VaInput placeholder="按CCS查询" v-model="search_ccs" class="mr-2" />
                    <VaInput placeholder="按机构查询" v-model="search_affiliation" class="mr-2" />
                    <VaSelect placeholder="按分类查询" v-model="search_category" class="mr-2"
                        :options="getCurrentCategoryList" @update:modelValue="onChangeSearchCategory" />
                    <VaButton @click="clearSearchByCategory" class="mr-2 mt-2" border-color="primary" size="small">清除分类
                        <VaIcon name="clear" />
                    </VaButton>
                    <!-- <VaInput placeholder="按作者查询" v-model="search_author" class="mr-2" /> -->
                    <!-- <VaInput placeholder="按机构查询" v-model="search_affiliation" class="mr-2" /> -->
                    <div class="">
                        <template v-for="frame in getMaxFrame">
                            <!-- use tiny button for frame navigation -->
                            <VaButton @click="jumpToFrame(frame)" size="small" class="mr-2 mt-2" color="secondary">
                                {{ frame }}
                            </VaButton>
                        </template>
                    </div>

                </div>
                <table class="va-table va-table--striped">
                    <thead class="noselect">
                        <tr>
                            <th>Title</th>
                            <th>Parent</th>
                            <th id="year" @click="sort_year_next()" style="cursor: pointer;">
                                <span>Year</span>
                                <VaIcon v-if="sorted_by === 'year'" :name="state2icon(sort_year_state())" />
                            </th>
                            <th>DOI</th>
                            <th>Authors</th>
                            <th>Affiliations</th>
                            <th>Category</th>
                            <th>Keywords</th>
                            <th>CCS Concepts</th>
                            <th>PDF</th>
                            <!-- <th>Abstract</th> -->
                            <th>PDF CTRL</th>
                            <th>GEN</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in getPapersAtFrame" :key="p.id">
                            <!-- <td>{{ p.title }}</td> -->
                            <!-- each title will route to /paper/{id} -->
                            <td><router-link :to="'/paper/' + p.id" class="va-link">{{ p.title }}</router-link></td>

                            <td class="smaller">{{ p.parent }}</td>
                            <!-- <td>
                                <VaBadge :text="p.parent" color="textPrimary" />
                            </td> -->
                            <td>{{ p.year }}</td>
                            <td> <a :href="p.doi" target="_blank" class="va-link black-link smaller">{{ p.doi_num }}</a>
                            </td>
                            <td>
                                <!-- generate badges in this column -->
                                <template v-for="author in p.authors" :key="author">
                                    <VaBadge :text="author" color="textInverted" class="ml-1 mt-1" />
                                </template>
                            </td>
                            <td>
                                <!-- since affiliations are long, don't use badges and split with ; -->
                                <template v-for="affiliation in p.affiliations" :key="affiliation">
                                    <span class="smallest">{{ affiliation }}.</span>
                                </template>
                            </td>
                            <td>
                                <VaBadge :text="p.category" :color="p.category_color" />
                            </td>
                            <td class="smaller">{{ p.keywords }}</td>
                            <td class="smaller">{{ p.ccs }}</td>
                            <td>
                                <!-- if has pdf, show the button -->
                                <VaButton v-if="p.has_pdf" size="small" @click="openPdf(p.pdf_open_url)"
                                    color="primary">PDF
                                </VaButton>
                                <!-- if no pdf, show the disabled button -->
                                <VaButton v-else size="small" disabled>PDF</VaButton>
                            </td>
                            <!-- <td>
                <VaButton size="small" @click="openAbstract(p.abstract_open_url)">摘要</VaButton>
              </td> -->
                            <td>
                                <VaButton size="small" @click="uploadPdf(p.id)" class="mr-1" color="secondary">+
                                </VaButton>
                                <VaButton size="small" @click="removePdf(p.id)" class="" color="secondary">-
                                </VaButton>
                            </td>
                            <td>
                                <VaButton size="small" @click="triggerGen(p.id)" class="mr-1" color="secondary">+
                                </VaButton>
                                <VaButton size="small" @click="removeGen(p.id)" class="" color="secondary">-
                                </VaButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <input type="file" style="display: none;" ref="fileInput" @change="onFileChange" accept="application/pdf" />

    </div>
</template>

<style scoped>
.black-link {
    color: black;
}

.smaller {
    font-size: 0.78rem;
}

.smallest {
    font-size: 0.7rem;
    /* font-family: "consolas"; */
    line-height: min-content;
}

.noselect {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    -khtml-user-select: none;
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Old versions of Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

.app {
    display: flex;
    font-size: 14px;
    width: 90%;
    margin: 0 auto;
}

/* fullwidth under mobile */
@media (max-width: 768px) {
    .app {
        width: 100%;
    }
}

.table-container {
    padding: 1rem;
}

.content {
    flex-grow: 1;
    padding: .5rem;
    overflow-x: auto;
    overflow-y: auto;
    /* Allow vertical scrolling in the content area */
    max-width: 100%;
    /* Ensure the content doesn't exceed the available width */
}
</style>
