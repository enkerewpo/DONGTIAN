<template>
    <div class="paper-view">
        <h1 class="va-h4">PDF手动搜索 当前ID: {{ $route.params.id }}</h1>
        <p class="mt-3">DOI: {{ doi }}</p>
        <p class="mt-3">标题: {{ title }}</p>
        <VaInput v-model="downloadUrl" placeholder="请输入PDF下载链接" class="mt-3" style="width: 80%" />
        <VaButton @click="downloadPdf" class="mt-3 ml-3">请求后台下载</VaButton>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import api from '@/util/api'
import { useRoute } from 'vue-router'
import { ui_log } from '@/util/log';

const $route = useRoute()

const doi = ref('')
const title = ref('')
const downloadUrl = ref('')

onMounted(() => {
    // call api to get doi and title
    api.get(`/get_paper/${$route.params.id}`).then(res => {
        doi.value = res.data.doi
        title.value = res.data.title
        let trans_title = title.value.replace(/ /g, '+').toLowerCase()
        console.log(doi.value, title.value, trans_title)
        // jump to google scholar search page in new tab 
        // window.location.href = `https://scholar.google.com/scholar?hl=en&as_sdt` + `=0%2C5&q=${`${title.value}`}`
        let url = `https://scholar.google.com/scholar?hl=en&as_sdt` + `=0%2C5&q=${`${title.value}`}`
        window.open(url, '_blank')
    })
})

const downloadPdf = () => {
    let url = downloadUrl.value
    api.post(`/download_pdf/${$route.params.id}`, { url: url }).then(res => {
        console.log(res)
        ui_log('下载成功')
    }).catch(err => {
        console.log(err)
        ui_log('下载失败', 'error')
    })
}

</script>

<style scoped>
.browser-view {
    /* display: flex; */
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
}

.frame {
    width: 100%;
    height: 100vh;
    border: none;
}
</style>