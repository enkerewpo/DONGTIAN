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
                    shadowBlur: 5,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.2)"
                }
            }
        }
    ]
});

const color_palette = ['#8ea604', '#ec9f05', '#f5bb00', '#d76a03', '#bf3100', '#8c0d0d', '#5c0a0a', '#2d0707', '#495E57', '#173B45'];

function auto_hide_ui() {
    if (window.innerWidth < 1000) {
        option.value.legend.show = false;
        option.value.title.text = '';
    } else {
        option.value.legend.show = true;
        option.value.title.text = 'CATEGORY OVERVIEW';
    }
}

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
    option.value.title.text = 'CATEGORY OVERVIEW';
    option.value.legend.data = data.map(item => item.name);
    option.value.textStyle = {
        fontFamily: 'Arial',
        fontSize: 12,
    };

    // add color palette to option series
    option.value.series[0].data.forEach((item, index) => {
        item.itemStyle = { color: color_palette[index % color_palette.length] };
    });

    auto_hide_ui();

    // add listener for chart when windows resize
    window.addEventListener('resize', () => {
        console.log('resize, width:', window.innerWidth);
        auto_hide_ui();
    });
});

</script>

<style scoped>
.chart {
    height: 500px;
}

.home-view {
    padding: 20px;
}
</style>