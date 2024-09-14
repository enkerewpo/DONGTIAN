<script>
import { ref, onMounted } from 'vue';
import api from '@/util/api';
import { useGlobalConfig } from 'vuestic-ui';
import { useToast } from 'vuestic-ui'

// Define a reference for storing the paper entries data.
const paperEntries = ref([]);
const { init, notify, close, closeAll } = useToast()

let category_list = [];
let map_category_to_color = {};

function ui_log(str) {
    notify({
        title: str,
        position: 'bottom-left',
    })
}

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
    if (authors_str === undefined) {
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
    if (authors_str === undefined) {
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

export default {
    setup() {
        const globalConfig = useGlobalConfig();
        const minimized = ref(false);

        const checkScreenWidth = () => {
            minimized.value = window.innerWidth < 768;
            console.log("minimized", minimized.value);
        };

        // Fetch the paper entries data when the component is mounted.
        onMounted(async () => {
            try {
                const response = await api.get('get_paper_entries');
                let r = process(response.data);
                paperEntries.value = r;
            } catch (error) {
                console.error("Error fetching paper entries:", error);
            }

            checkScreenWidth();
            window.addEventListener('resize', checkScreenWidth);

        });

        return {
            globalConfig,
            paperEntries,
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
            searchTitle: "",
            searchCCS: "",
            // filtered_paperEntries: [],
            sorted_by: "year", // support year and parent
            sorted_order: "desc", // "asc" or "desc" if possible
            tmp_pdf_upload_id: null,
            tmp_pdf_file: null,
            current_frame: 0,
            entries_per_frame: 8,
        };
    },
    computed: {
        getPapers: function () {
            console.log("getPapers:" + this.searchTitle + "," + this.searchCCS + "," + this.sorted_by + "," + this.sorted_order);
            let ret = [];
            let filtered = [];
            if (this.searchTitle === "" && this.searchCCS === "") {
                ret = this.paperEntries;
            } else {
                if (this.searchTitle === "") {
                    filtered = this.paperEntries;
                } else {
                    filtered = this.paperEntries.filter(p => p.title.toLowerCase().includes(this.searchTitle.toLowerCase()));
                }
                // console.log("filtered:", filtered);
                if (this.searchCCS === "") {
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
                        if (p.ccs.toLowerCase().includes(this.searchCCS.toLowerCase())) {
                            ret.push(p);
                        }
                    }
                }
                console.log("ret length:", ret.length);
            }
            // then check sorted_by
            let ret2 = ret;
            if (this.sorted_by === "year") {
                if (this.sorted_order === "desc") {
                    ret2.sort((a, b) => parseInt(b.year) - parseInt(a.year));
                } else {
                    ret2.sort((a, b) => parseInt(a.year) - parseInt(b.year));
                }
            } else {
                // default sort by has pdf
                ret2.sort((a, b) => b.has_pdf - a.has_pdf);
            }
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
                this.current_frame += 1;
            }
        },
        gotoPrevFrame: function () {
            // go to the previous frame
            if (this.current_frame > 0) {
                this.current_frame -= 1;
            }
        },
        jumpToFrame: function (frame) {
            // jump to the frame
            this.current_frame = frame - 1;
        },
        getTitleById: function (id) {
            for (let i = 0; i < this.paperEntries.length; i++) {
                if (this.paperEntries[i].id === id) {
                    return this.paperEntries[i].title;
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
                this.paperEntries = r;
                ui_log("已刷新");
            }).catch(error => {
                console.error("Error fetching paper entries:", error);
                ui_log("刷新失败");
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
                <div class="va-input-group mb-2">
                    <VaInput placeholder="按标题查询" v-model="searchTitle" class="mr-2" />
                    <VaInput placeholder="按CCS查询" v-model="searchCCS" class="mr-2" />
                    <VaButton @click="forceRefresh()" preset="primary" class="" border-color="primary" icon="refresh">
                    </VaButton>
                    <!-- frame navigation -->
                    <VaButton @click="gotoPrevFrame()" preset="primary" class="ml-2" border-color="primary"
                        icon="arrow_back">
                    </VaButton>
                    <!-- current frame index -->
                    <span class="ml-3 mr-3">{{ current_frame + 1 }} / {{ getMaxFrame }}</span>
                    <VaButton @click="gotoNextFrame()" preset="primary" class="ml-2" border-color="primary"
                        icon="arrow_forward">
                    </VaButton>
                    <div class="mt-3 mb-2">
                        <template v-for="frame in getMaxFrame">
                            <!-- use tiny button for frame navigation -->
                            <VaButton @click="jumpToFrame(frame)" size="small" class="ml-1" border-color="primary">
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

                            <!-- <td>{{ p.parent }}</td> -->
                            <td>
                                <VaBadge :text="p.parent" color="textPrimary" />
                            </td>
                            <td>{{ p.year }}</td>
                            <td> <a :href="p.doi" target="_blank" class="va-link black-link">{{ p.doi_num }}</a> </td>
                            <td>
                                <!-- generate badges in this column -->
                                <template v-for="author in p.authors" :key="author">
                                    <VaBadge :text="author" color="textInverted" class="ml-1 mt-1" />
                                </template>
                            </td>
                            <td>
                                <!-- since affiliations are long, don't use badges and split with ; -->
                                <template v-for="affiliation in p.affiliations" :key="affiliation">
                                    <span class="smallest">{{ affiliation }};</span>
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
