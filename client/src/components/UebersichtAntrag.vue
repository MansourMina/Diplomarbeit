<template>
  <v-card style="max-height:70vh; min-height:63vh; overflow:auto">
    <div class="d-flex">
      <v-card-title class="black--text">Anfragen</v-card-title>
      <v-spacer></v-spacer>
      <v-btn icon color="black" to="/requests" class="ma-5">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>
    <div class="ma-5">
      <v-list
        class="text-center"
        v-if="limitAnträge.length == 0"
        align="center"
      >
        <i>No data available</i>
      </v-list>
      <v-list
        v-for="item in limitAnträge"
        :key="item.firmen_id"
        class="pa-0"
        v-else
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-text="item.firmen_name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-subtitle v-if="item.status == 'Anfrage'">
              <v-chip color="primary" dark small>{{ item.status }}</v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="item.status == 'Abgelehnt'">
              <v-chip color="error" small>{{ item.status }}</v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="item.status == 'Teilnehmer'">
              <v-chip color="success" small>{{ item.status }}</v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="item.status == 'Daten erhalten'">
              <v-chip color="blue-grey" class="white--text" small>{{
                item.status
              }}</v-chip>
            </v-list-item-subtitle>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>

    <v-card-text class="pt-4 " style="position:absolute; bottom: 0 ">
      <div class="text-h6 font-weight-light mb-2">
        Letzte Anfragen
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
    limitAnträge() {
      return this.limit ? this.antraege.slice(0, this.limit) : this.antraege;
    },
    lastRequest() {
      if (this.antraege != undefined && this.antraege.length != 0) {
        return this.antraege[0].anfrage_zeitpunkt.substring(0, 10);
      }
      return 'N/A';
    },
  },

  data() {
    return {
      limit: 5,
    };
  },
  props: {
    antraege: {
      type: Array,
    },
  },
};
</script>

<style scoped></style>
