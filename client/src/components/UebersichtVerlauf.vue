<template>
  <!-- ${limitActivities.length == 0 ? 'display:flex; justify-content:center; align-items:center;':'none'} ` -->
  <v-card style="max-height:70vh; min-height:63vh; overflow:auto; ">
    <div class="d-flex ">
      <v-card-title class="black--text">Aktivitäten</v-card-title>
      <v-spacer></v-spacer>
      <v-btn icon color="black" to="/activities" class="ma-5">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>
    <div class="ma-5">
      <v-list class="text-center" v-if="limitActivities.length == 0">
        <i>No data available</i>
      </v-list>
      <v-list
        v-for="h in limitActivities"
        :key="h.history_id"
        class="pa-0"
        v-else
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
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-subtitle v-if="h.type == 'login' || h.type == 'Login'"
              >das erste Mal angemeldet
            </v-list-item-subtitle>
            <v-list-item-subtitle
              v-else-if="h.type == 'formular' || h.type == 'Formular'"
              >Formualar ausgefüllt</v-list-item-subtitle
            >
            <v-list-item-subtitle v-else>Feedback gegeben</v-list-item-subtitle>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>
    <v-card-text class="pt-4 " style="position:absolute; bottom: 0 ">
      <div class="text-h6 font-weight-light mb-2">
        Letzte Aktivitäten
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>
        mdi-clock
      </v-icon>
      <span class="text-caption grey--text font-weight-light"
        >Zuletzt am {{ new Date(lastRequest).toLocaleDateString() }}</span
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    limitActivities() {
      return this.limit
        ? this.activities.slice(0, this.limit)
        : this.activities;
    },
    lastRequest() {
      if (this.activities != undefined && this.activities.length != 0) {
        return this.activities[0].time.substring(0, 10);
      }
      return 'N/A';
    },
  },
  data() {
    return {
      limit: 4,
    };
  },
  props: {
    activities: {
      type: Array,
    },
  },
};
</script>

<style scoped></style>
