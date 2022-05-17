<template>
  <v-container fluid>
    <div class=" primary white--text text-center mx-0 my-5 ma-lg-10">
      <v-row class="mt-2 pa-5 pb " align="center" text-center>
        <v-col cols="12" md="3">
          <span
            style="font-size: 1.25rem;font-weight: 500;letter-spacing: 0.0125em;"
          >
            FIRMEN AKTIVITÄTEN
          </span></v-col
        >
        <v-col cols="12" md="5">
          <v-text-field
            v-model="search"
            hide-details
            label="Nach Firma suchen..."
            solo
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="status"
            :items="statuse"
            hide-details
            chips
            small-chips
            label="Status filtern"
            multiple
            solo
          ></v-autocomplete>
        </v-col>
      </v-row>
    </div>
    <v-card
      class="mx-0 my-5 ma-lg-10"
      min-height="500"
      v-if="!loaded"
      elevation="0"
    >
      <v-skeleton-loader
        width="40%"
        type="list-item-avatar-two-line"
        :loading="loading"
        transition="fade-transition"
        v-for="i in 10"
        :key="i"
      ></v-skeleton-loader>
    </v-card>
    <div v-else>
      <v-card
        class="mx-0 my-5 ma-lg-10 center"
        min-height="500"
        elevation="0"
        v-if="filterActivities.length == 0"
      >
        <div>
          <p><i>No data available</i></p>
        </div>
      </v-card>

      <v-card class="mx-0 my-5 ma-lg-10" v-else min-height="500" elevation="0">
        <v-list
          v-for="(h, index) in filterActivities"
          :key="h.history_id"
          class="pa-0"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-icon
                v-if="h.type == 'formular' || h.type == 'Formular'"
                class="red darken-4"
                dark
                >mdi-clipboard-text</v-icon
              >
              <v-icon
                v-else-if="h.type == 'login' || h.type == 'Login'"
                class="blue"
                dark
                >mdi-gesture-tap-button</v-icon
              >
              <v-icon v-else class="green" dark
                >mdi-thumbs-up-down-outline</v-icon
              >
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="h.firmen_name"></v-list-item-title>

              <v-list-item-subtitle
                v-if="h.type == 'login' || h.type == 'Login'"
                >das erste Mal angemeldet
              </v-list-item-subtitle>
              <v-list-item-subtitle
                v-else-if="h.type == 'formular' || h.type == 'Formular'"
                >Formualar ausgefüllt</v-list-item-subtitle
              >
              <v-list-item-subtitle v-else
                >Feedback gegeben</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-subtitle
                v-text="new Date(h.time.substring(0, 10)).toLocaleDateString()"
              ></v-list-item-subtitle>
              <v-btn
                class="mt-1 plain pr-0 mr-0 "
                text
                @click="
                  dialogData = true;
                  selectedItem = h;
                "
                v-if="h.type == 'formular' || h.type == 'Formular'"
                >Details</v-btn
              >
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < filterActivities.length - 1"
            inset
            class="my-0"
          ></v-divider>
        </v-list>
      </v-card>
    </div>
    <v-dialog max-width="600px" v-model="dialogData">
      <ShowData @close="dialogData = false" :user="selectedItem" />
    </v-dialog>
  </v-container>
</template>

<script>
import ShowData from '@/components/ShowData.vue';

export default {
  components: {
    ShowData,
  },

  props: {
    activities: {
      type: Array,
    },
  },
  async created() {
    const readyHandler = () => {
      if (document.readyState == 'complete') {
        this.loading = false;
        this.loaded = true;
        document.removeEventListener('readystatechange', readyHandler);
      }
    };

    document.addEventListener('readystatechange', readyHandler);

    readyHandler();
  },
  data: () => ({
    // files: [
    //   {
    //     color: 'blue',
    //     icon: 'mdi-clipboard-text',
    //     subtitle: 'Formualar ausgefüllt',
    //     date: '12 hr',
    //     title: 'HTL GmbH',
    //   },
    //   {
    //     color: 'red darken-4',
    //     icon: 'mdi-gesture-tap-button',
    //     subtitle: 'Angemeldet',
    //     date: '6 hr',
    //     title: 'Wojtasik GmbH',
    //   },
    //   {
    //     color: 'red darken-4',
    //     icon: 'mdi-gesture-tap-button',
    //     subtitle: 'Angemeldet',
    //     date: '6 hr',
    //     title: 'Wojtasik GmbH',
    //   },
    //   {
    //     color: 'blue',
    //     icon: 'mdi-clipboard-text',
    //     subtitle: 'Formualar ausgefüllt',
    //     date: '12 hr',
    //     title: 'HTL GmbH',
    //   },
    //   {
    //     color: 'blue',
    //     icon: 'mdi-clipboard-text',
    //     subtitle: 'Formualar ausgefüllt',
    //     date: '12 hr',
    //     title: 'HTL GmbH',
    //   },
    //   {
    //     color: 'blue',
    //     icon: 'mdi-clipboard-text',
    //     subtitle: 'Formualar ausgefüllt',
    //     date: '12 hr',
    //     title: 'HTL GmbH',
    //   },
    //   {
    //     color: 'red darken-4',
    //     icon: 'mdi-gesture-tap-button',
    //     subtitle: 'Angemeldet',
    //     date: '6 hr',
    //     title: 'Wojtasik GmbH',
    //   },
    //   {
    //     color: 'red darken-4',
    //     icon: 'mdi-gesture-tap-button',
    //     subtitle: 'Angemeldet',
    //     date: '6 hr',
    //     title: 'Wojtasik GmbH',
    //   },
    // ],
    search: '',
    statuse: ['Formular', 'Login', 'Feedback'],
    status: '',
    dialogData: false,
    loading: true,
    loaded: false,
    selectedItem: {},
  }),
  computed: {
    filterActivities() {
      if (this.status.length > 0) {
        return this.activities.filter(
          (el) =>
            el.firmen_name.toLowerCase().includes(this.search.toLowerCase()) &&
            this.status.includes(el.type),
        );
      } else {
        return this.activities.filter((el) =>
          el.firmen_name.toLowerCase().includes(this.search.toLowerCase()),
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
