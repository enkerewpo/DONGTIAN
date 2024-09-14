<template>
    <div class="paper-view">
        <div v-if="paper">
            <VaButton @click="goBack" class="mb-1" size="small">返回</VaButton>
            <VaButton @click="editPaper" class="ml-1 mb-1" size="small">编辑</VaButton>
            <!-- <VaButton @click="refreshPaper" class="ml-1 mb-1 mr-1" size="small">刷新</VaButton> -->
            <h1 class="va-h4">{{ paper.title }}</h1>
            <div class="va-text-block">
                <h2 class="va-h6">摘要</h2>
                <p class="va-display-3">{{ paper.abstract }}</p>
            </div>
            <div class="va-text-block mt-4">
                <h2 class="va-h6">关键词</h2>
                <p>{{ paper.keywords }}</p>
            </div>
            <div class="va-text-block mt-4">
                <h2 class="va-h6">作者</h2>
                <p>{{ paper.authors }}</p>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useToast } from 'vuestic-ui'

const paper = ref(null);

export default {
    name: 'PaperView',
    // call /get_paper/{id} to get paper data when entering or refreshing the page
    setup() {
        const route = useRoute();
        const toast = useToast();

        onMounted(async () => {
            try {
                const response = await axios.get(`/get_paper/${route.params.id}`);
                paper.value = response.data;
            } catch (error) {
                toast.open({
                    text: 'Failed to fetch paper data',
                    type: 'error',
                });
            }
        });

        return {
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
.paper-view {
    padding: 20px;
}
</style>