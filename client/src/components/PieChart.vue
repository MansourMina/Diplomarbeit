<template>
  <div v-if="loaded">
    <Pie
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
import axios from 'axios';
import { Pie } from 'vue-chartjs/legacy';

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
  name: 'PieChart',
  components: {
    Pie,
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart',
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
      default: 190,
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
  methods: {
    async getFeedbackData() {
      const { data } = await axios({
        url: '/feedbackdata',
        method: 'GET',
      });
      data.erneuteTeilnahme.forEach((el) => {
        const labelIndex = this.chartData.labels.indexOf(
          el.erneute_teilnahme ? 'Ja' : 'Nein',
        );
        this.chartData.datasets[0].data[labelIndex] = Number(
          el.erneute_teilnahme_count,
        );
      });
    },
  },
  async created() {
    await this.getFeedbackData();

    // Ansonsten lädt die Chart nicht. Man müsste dann immer auf die Chart drücken oder das Fenster kleiner machen, um es sich anzuzeigen.
    this.loaded = true;
  },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: ['Ja', 'Nein'],
        datasets: [
          {
            backgroundColor: ['#00C853', '#B71C1C'],
            data: [0, 0],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      erneuteTeilnahmeFeedbackData: [],
    };
  },
};
</script>
