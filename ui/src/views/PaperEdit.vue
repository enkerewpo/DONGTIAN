<template>
    <div class="paper-view">
        <div v-if="paper">
            <VaButton @click="goBack" class="mb-1" size="small">返回</VaButton>
            <VaButton @click="submitEdit" class="ml-1 mb-1" size="small">提交</VaButton>
            <VaButton @click="deleteEntry" class="ml-1 mb-1" size="small">删除</VaButton>
            <VaButton @click="updateFromCrossRef" class="ml-1 mb-1" size="small">由DOI在线更新基本信息</VaButton>
            <VaButton @click="autoFetchPDFfromScihub" class="ml-1 mb-1" size="small">由DOI自动下载PDF(Sci-Hub)</VaButton>
            <h1 class="va-h4 mb-5">正在编辑：{{ paper.title }}</h1>
            <VaForm ref="formRef" class="flex flex-col items-baseline gap-6">
                <VaTextarea v-model="paper.title" label="标题" placeholder="请输入标题" class="textarea" />
                <VaTextarea v-model="paper.abstract" label="摘要" placeholder="请输入摘要" class="textarea" />
                <VaTextarea v-model="paper.keywords" label="关键词" placeholder="请输入关键词" class="textarea" />
                <VaTextarea v-model="paper.authors" label="作者" placeholder="请输入作者" class="textarea" />
                <VaTextarea v-model="paper.doi" label="DOI" placeholder="请输入DOI" class="textarea" />
                <VaTextarea v-model="paper.category" label="分类" placeholder="请输入分类" class="textarea" />
                <VaTextarea v-model="paper.year" label="年份" placeholder="请输入年份" class="textarea" />
                <VaTextarea v-model="paper.parent" label="会议/期刊" placeholder="请输入会议/期刊" class="textarea" />
            </VaForm>
        </div>
        <div v-else>
            <p>加载中……</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
// import axios from 'axios';
import api from '@/util/api';
import { useRoute } from 'vue-router';
import { ui_log } from '@/util/log';

const paper = ref(null);

export default {
    name: 'PaperEdit',
    // call /get_paper/{id} to get paper data when entering or refreshing the page
    setup() {
        console.log('(PaperEdit) setup');
        const route = useRoute();

        onMounted(async () => {
            console.log('(PaperEdit) onMounted');
            try {
                const response = await api.get('get_paper/' + route.params.id);
                console.log(response);
                paper.value = response.data;
                console.log("ok");
            } catch (error) {
                ui_log('获取论文数据失败');
            }
        });

        return {
            paper,
        };
    },
    data() {
        return {
            references: [],
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        submitEdit() {
            console.log('submitEdit');
            console.log(this.paper);
            api.post('update_paper/' + this.paper.id, this.paper)
                .then(response => {
                    console.log(response);
                    this.$router.go(-1);
                })
                .catch(error => {
                    console.log(error);
                    ui_log('更新论文数据失败');
                });
        },
        deleteEntry() {
            api.post('rm_paper/' + this.paper.id)
                .then(response => {
                    console.log(response);
                    // goto "/papers"
                    this.$router.push('/papers');
                })
                .catch(error => {
                    console.log(error);
                    ui_log('删除论文数据失败');
                });
        },
        async updateFromCrossRef() {
            let doi = this.paper.doi; // in format of https://doi.org/10.5555/12345678
            if (!doi || doi == '') {
                ui_log('在线更新失败，DOI为空');
            }
            if (doi.startsWith('https://doi.org/')) {
                // remove 'https://doi.org/' prefix
                doi = doi.split('https://doi.org/')[1];
            }
            ui_log('[DEBUG] doi: ' + doi);
            // for example 10.5555/12345678 -> https://api.crossref.org/works/10.5555/12345678
            let url = 'https://api.crossref.org/works/' + doi;
            try {
                const response = await api.get(url);
                console.log(response);
                let data = response.data.message;
                console.log(data);
                this.paper.title = data.title[0];
                let authors_raw = data.author;
                // convert author list to string, [name1@aff1][name2@aff2]...
                let authors = '';
                for (let i = 0; i < authors_raw.length; i++) {
                    let author = authors_raw[i];
                    authors += '[';
                    authors += author.given + ' ' + author.family;
                    let affiliation_name = 'none';
                    if (author.affiliation && author.affiliation.length > 0) {
                        affiliation_name = author.affiliation[0].name;
                    }
                    authors += '@' + affiliation_name;
                    authors += ']';
                }
                this.paper.authors = authors;
                this.paper.year = data.created['date-parts'][0][0];
                this.paper.doi = "https://doi.org/" + data.DOI;
                this.paper.parent = data['container-title'][0];
                // ask gpt to get abbreviated journal name
                ui_log('更新成功');
            } catch (error) {
                console.log(error);
                this.toast.open({
                    text: 'Failed to fetch paper data from CrossRef',
                    type: 'error',
                });
            }
        },
        async autoFetchPDFfromScihub() {
            let doi = this.paper.doi; // in format of https://doi.org/10.5555/12345678
            if (!doi || doi == '') {
                ui_log('自动下载PDF失败，DOI为空');
            }
            if (doi.startsWith('https://doi.org/')) {
                // remove 'https://doi.org/' prefix
                doi = doi.split('https://doi.org/')[1];
            }
            ui_log('[DEBUG] doi: ' + doi);
            // send a post request to /fetch_pdf/id to trigger a background task to fetch pdf
            try {
                ui_log('正在执行自动下载PDF流程，请不要关闭页面！');
                const response = await api.post('fetch_pdf/' + this.paper.id, { doi: doi });
                console.log(response);
                ui_log('成功找到PDF并更新数据库');
            } catch (error) {
                console.log(error);
                ui_log('自动下载PDF失败：' + error + '，MSG: ' + error.response.data);
            }
        },
    },
}

</script>

<style>
.paper-view {
    padding: 20px;
    /* width 70% on PC, full width on mobile */
    width: 61%;
    margin: auto;
}

/* mobile */
@media (max-width: 1000px) {
    .paper-view {
        width: 100%;
    }
}

.textarea {
    padding: auto;
    margin-top: 10px;
    width: 100%;
}
</style>