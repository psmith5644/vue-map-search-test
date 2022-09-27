<template>
    <Bar id="myChart"
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
    />
</template>

<script>
import {Bar} from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {store} from '@/store.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 50
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => {}
        },
        plugins: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            store,
            chartData: {
                labels: [],
                datasets: []
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0 
                        }
                    }
                }
            }
        }
    },
    methods: {
        /**
         * Transforms the provided traffic data and provides it to the bar chart.
         */
        getChartData() {
            let trafficData;
            if ('details' in this.store.place && 'avgStoreTraffic' in this.store.place.details) {
                trafficData = this.store.place.details.avgStoreTraffic;
            }

            // Clean data
            for (const day in trafficData) {
                if (typeof trafficData[day] !== 'number') {
                    delete trafficData[day];
                }
            }

            // provide data to the chart and add a color gradient
            this.chartData.labels = Object.keys(trafficData);
            this.chartData.datasets = [ {label: "Traffic", data: Object.values(trafficData), backgroundColor: (ctx) => {
                
                const canvas = ctx.chart.ctx;
                const gradient = canvas.createLinearGradient(0,0,0,160);

                gradient.addColorStop(.25, 'red');
                gradient.addColorStop(.5, 'orange');
                gradient.addColorStop(1, 'yellow');

                return gradient; } 
            } ]

            
        },
    },
    created() {
        this.getChartData()
    }
}
</script>
