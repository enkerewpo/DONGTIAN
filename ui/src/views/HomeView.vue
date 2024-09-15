<template>
    <div class="paper-view va-block">
        <div class="va-h4">欢迎来到洞天论文知识图谱系统！</div>
        <div class="va-display-1">wheatfox (enkerewpo@hotmail.com)</div>
    </div>
    <div class="paper-view va-block">
        <!-- <div class="va-h5">分类总览</div> -->
        <!-- pie chart-->
        <v-chart class="chart" :option="option" />
    </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";
import { onMounted } from "vue";
import api from '@/util/api';

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);

provide(THEME_KEY, "light");

const option = ref({
    aria: {
        enabled: true,
        decal: {
            show: true,
            decals: [
                { symbol: 'rect' },
                { symbol: 'circle' },
                { symbol: 'roundRect' },
                { symbol: 'triangle' },
                { symbol: 'diamond' },
                { symbol: 'pin' },
                { symbol: 'arrow' }
            ]
        }
    },
    title: {
        text: null,
        left: "center"
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: "vertical",
        left: "left",
        data: []
    },
    series: [
        {
            name: null,
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            }
        }
    ]
});

console.log('HomeView setup');
// send a request to get the category and count info and update the option
onMounted(async () => {
    console.log('HomeView onMounted');
    const response = await api.get('/category_and_count');
    console.log(response.data);
    // format: [{name: 'cat1', count: 100}, ...]
    // update the option
    let data = response.data.map(item => {
        if (item.name === 'none' || item.name === null) {
            // just skip
            return null;
        }
        let tmp = { value: item.count, name: item.name };
        return tmp;
    });
    data = data.filter(item => item !== null);
    option.value.series[0].data = data;
    // set chart name
    option.value.title.text = '各分类论文数量';
});

</script>

<style scoped>
.chart {
    height: 600px;
}

.home-view {
    padding: 20px;
}
</style>

<!-- setup() {
        console.log('(HomeView) setup');
        onMounted(async () => {
            console.log('(HomeView) onMounted');
            const response = await api.get('/category_and_count');
            console.log(response.data);
            categories_info.value = response.data;
            // format: [{name: 'cat1', count: 100}, ...]
        });
    }, -->