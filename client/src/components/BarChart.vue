<template>
  <div v-if="loaded">
    <Bar
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
import { Bar } from 'vue-chartjs/legacy';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      loaded: false,
      teilnahmeProzessFeedback: [],
      kommunikationFeedback: [],
      organisiertFeedback: [],
      chartData: {
        labels: [
          'Sehr gut',
          'Gut',
          'Zufriedenstellend',
          'Nicht gut',
          'Gar nicht gut',
        ],
        datasets: [
          {
            label: 'Kommunikation mit Organsiator ',
            backgroundColor: '#B71C1C',
            data: [0, 0, 0, 0, 0],
          },
          {
            label: 'Teilnahme Prozess ',
            backgroundColor: '#0D47A1',
            data: [0, 0, 0, 0, 0],
          },
          {
            label: 'Organisation der Veranstaltung',
            backgroundColor: '#1B5E20',
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
  props: {
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 550,
    },
    height: {
      type: Number,
      default: 550,
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
    await this.setData();

    // Ansonsten lädt die Chart nicht. Man müsste dann immer auf die Chart drücken oder das Fenster kleiner machen, um es sich anzuzeigen.
    this.loaded = true;
  },
  methods: {
    setData() {
      const kommunikation = this.chartData.datasets
        .filter((el) => el.label.includes('Kommunikation'))
        .map((el) => el.data)[0];
      const teilnahmeProzess = this.chartData.datasets
        .filter((el) => el.label.includes('Teilnahme'))
        .map((el) => el.data)[0];
      const organisiert = this.chartData.datasets
        .filter((el) => el.label.includes('Organisation'))
        .map((el) => el.data)[0];

      this.kommunikationFeedback.forEach((el) => {
        const labelIndex = this.chartData.labels.indexOf(
          this.convertLikeLabel(el.kommunikation),
        );

        kommunikation[labelIndex] = Number(el.kommunikation_count);
      });
      this.teilnahmeProzessFeedback.forEach((el) => {
        const labelIndex = this.chartData.labels.indexOf(
          this.convertLikeLabel(el.teilnahme_prozess),
        );

        teilnahmeProzess[labelIndex] = Number(el.teilnahme_prozess_count);
      });
      this.organisiertFeedback.forEach((el) => {
        const labelIndex = this.chartData.labels.indexOf(
          this.convertLikeLabel(el.organisiert),
        );
        organisiert[labelIndex] = Number(el.organisiert_count);
      });
    },
    async getFeedbackData() {
      const { data } = await axios({
        url: '/feedbackdata',
        method: 'GET',
      });
      this.kommunikationFeedback = data.kommunikation;
      this.teilnahmeProzessFeedback = data.teilnahmeProzess;
      this.organisiertFeedback = data.organisiert;
    },
    convertLikeLabel(kategorie) {
      switch (kategorie) {
        case 1:
        case 'Sehr gut organisiert':
          return 'Sehr gut';
        case 2:
        case 'Sehr organisiert':
          return 'Gut';
        case 3:
        case 'Etwas organisiert':
          return 'Zufriedenstellend';
        case 4:
        case 'Nicht so organisiert':
          return 'Nicht gut';
        case 5:
        case 'Überhaupt nicht organisiert':
          return 'Gar nicht gut';
        default:
          return 'diesdas';
      }
    },
  },
};
</script>
