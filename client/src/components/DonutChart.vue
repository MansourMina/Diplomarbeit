<template>
  <div v-if="loaded">
    <Doughnut
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
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs/legacy';
import axios from 'axios';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut,
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 350,
    },
    height: {
      type: Number,
      default: 290,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  async created() {
    await this.getFeedbackData();
    this.loaded = true;
  },
  methods: {
    async getFeedbackData() {
      const { data } = await axios({
        url: '/feedbackdata',
        method: 'GET',
      });
      data.dauer.forEach((el) => {
        const labelIndex = this.chartData.labels.indexOf(el.dauer);
        this.chartData.datasets[0].data[labelIndex] = Number(el.dauer_count);
      });
    },
  },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [
          'Viel zu lang',
          'Zu lang',
          'Ungefähr richtig',
          'Zu kurz',
          'Viel zu kurz',
        ],
        datasets: [
          {
            backgroundColor: [
              '#D50000',
              '#66BB6A',
              '#00C853',
              '#C8E6C9',
              '#F44336',
            ],
            data: [0, 0, 0, 0, 0],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
