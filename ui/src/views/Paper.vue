<template>
    <div class="paper-view">
        <div v-if="paper">
            <VaButton @click="goBack" class="mb-1" size="small">返回</VaButton>
            <VaButton @click="editPaper" class="ml-1 mb-1" size="small">编辑</VaButton>
            <h1 class="va-h4">{{ paper.title }}</h1>
            <div class="va-text-block">
                <h2 class="va-h6 mb-3">摘要</h2>
                <p class="va-display-3">{{ paper.abstract }}</p>
            </div>
            <div class="va-text-block mt-4">
                <h2 class="va-h6 mb-3">分类</h2>
                <p>{{ paper.category }}</p>
            </div>
            <div class="va-text-block mt-4">
                <h2 class="va-h6 mb-3">关键词</h2>
                <p>{{ paper.keywords }}</p>
            </div>
            <div class="va-text-block mt-4">
                <h2 class="va-h6 mb-3">作者</h2>
                <p>{{ paper.authors }}</p>
            </div>
            <div class="va-text-block mt-4">
                <h2 class="va-h6 mb-3">DOI</h2>
                <p>{{ paper.doi }}</p>
            </div>
            <div class="va-text-block mt-4">
                <h2 class="va-h6 mb-3">年份</h2>
                <p>{{ paper.year }}</p>
            </div>
            <div class="va-text-block mt-4">
                <h2 class="va-h6 mb-3">会议/期刊</h2>
                <p>{{ paper.parent }}</p>
            </div>
            <table class="va-table mt-4 table-style va-table--striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>原始引用</th>
                        <th>DOI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="r in references" :key="r.id">
                        <td>{{ r.id }}</td>
                        <td>{{ r.unstructured }}</td>
                        <td>{{ r.doi }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
// import axios from 'axios';
import api from '@/util/api';
import { useRoute } from 'vue-router';
import { useToast } from 'vuestic-ui'
import { getCrossRef } from '@/util/tool';
import { ui_log } from '@/util/log';

const paper = ref(null);
const references = ref([]);

export default {
    name: 'PaperView',
    // call /get_paper/{id} to get paper data when entering or refreshing the page
    setup() {
        console.log('(PaperView) setup');
        const route = useRoute();
        const toast = useToast();

        onMounted(async () => {
            console.log('(PaperView) onMounted');
            try {
                const response = await api.get('get_paper/' + route.params.id);
                // console.log(response);
                paper.value = response.data;
                console.log(paper.value);

                let cross_ref = await getCrossRef(paper.value.doi);
                let reference_raw = cross_ref.reference;

                references.value = [];

                // 在references中添加一个伪引用，用于指示是否正在加载
                references.value.push({
                    id: 999,
                    doi: "加载中...",
                    unstructured: "加载中...",
                });

                // console.log(reference_raw);
                for (let i = 0; i < reference_raw.length; i++) {
                    let doi = reference_raw[i].DOI;
                    let generated = "";
                    if (doi != null) {
                        // use getCrossRef to get basic info, add to unstructured:
                        // year, title, author, journal, volume, issue, page if exists
                        let ref_cross_ref = await getCrossRef(doi);
                        if (ref_cross_ref == null) {
                            // ui_log('自动获取引用元信息失败：' + doi, 'error');
                            continue;
                        }
                        let title = ref_cross_ref.title ? ref_cross_ref.title : "[No title]";
                        let year = ref_cross_ref.issued['date-parts'][0][0] ? ref_cross_ref.issued['date-parts'][0][0] : "[No year]";
                        let author0 = ref_cross_ref.author ? ref_cross_ref.author[0].family : "[No author]";
                        let event = ref_cross_ref.event ? ref_cross_ref.event.name : "[No event]";
                        let container_title = ref_cross_ref['container-title'] ? ref_cross_ref['container-title'][0] : "[No container title]";
                        let formatted = `${author0} (${year}). ${title}. ${container_title}. ${event}.`;
                        generated = formatted;
                    }
                    let unstructured = reference_raw[i].unstructured;
                    if (unstructured == null) {
                        unstructured = generated;
                    }
                    let reference = {
                        id: i,
                        doi: doi,
                        unstructured: unstructured,
                    }
                    // get the last one loading 
                    let popped = references.value.pop();
                    references.value.push(reference);
                    references.value.push(popped);
                    // sort by id
                    // references.value.sort((a, b) => a.id - b.id);
                }
                // console.log(references.value);
                console.log("ok");
                // remove the last element (loading)
                references.value.pop();
            } catch (error) {
                console.log(error);
                ui_log('加载错误：' + error, 'error');
            }
        });

        return {
            references,
            paper,
        };
    },
    data() {
        return {
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        editPaper() {
            this.$router.push(`/edit_paper/${this.paper.id}`);
        },
        refreshPaper() {
            this.$router.go(0);
        },
    },
}

</script>

<style>
.table-style {
    font-size: 13px;
}
</style>