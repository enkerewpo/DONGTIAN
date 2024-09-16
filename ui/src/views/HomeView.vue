<template>
    <div class="paper-view va-block">
        <div class="va-h4">欢迎来到洞天论文知识图谱系统！</div>
        <div class="va-display-1">wheatfox (enkerewpo@hotmail.com)</div>
    </div>
    <div class="paper-view va-block">
        <!-- <div class="va-h5">分类总览</div> -->
        <!-- pie chart-->
        <v-chart class="chart" :option="option" :autoresize="true" />
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

const color_palette = [
    '#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE', '#000000', '#808080', '#FFFFFF'
];

console.log('HomeView setup');
// send a request to get the category and count info and update the option
onMounted(async () => {
    console.log('HomeView onMounted');
    const response = await api.get('category_and_count');
    console.log(response.data);
    // format: [{name: 'cat1', count: 100}, ...]
    // update the option
    let data = response.data.map(item => {
        if (item.name === 'none' || item.name === null) {
            // just skip
            return null;
        }
        let tmp = { value: item.count, name: item.name + '(' + item.count + ')' };
        return tmp;
    });
    data = data.filter(item => item !== null);
    option.value.series[0].data = data;
    // set chart name
    option.value.title.text = '各分类论文数量';

    // add color palette to option series
    option.value.series[0].data.forEach((item, index) => {
        item.itemStyle = { color: color_palette[index % color_palette.length] };
    });

    // add listener for chart when windows resize
    window.addEventListener('resize', () => {
        console.log('resize');
    });
});

</script>

<style scoped>
.chart {
    height: 400px;
}

.home-view {
    padding: 20px;
}
</style>