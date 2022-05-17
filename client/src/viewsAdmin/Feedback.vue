<template>
  <div>
    <!-- Für eine Not available Page -->
    <!-- <v-container
      v-if="Date.now() > new Date(karrieretagDaten.datum) == false"
      style="height: 80vh; width: 100vw; display:flex; justify-content:center; align-items:center"
    >
      <v-icon x-large>mdi-thumbs-up-down</v-icon>
    </v-container> -->

    <!-- Keine Daten verfügbar -->
    <v-container
      v-if="feedbackdata.length == 0"
      style="height: 80vh; width: 100vw; display:flex; justify-content:center; align-items:center; flex-flow: column"
    >
      <v-icon x-large>mdi-thumbs-up-down</v-icon>
      <h1>No data available</h1>
    </v-container>
    <v-container class="pa-md-15 pt-0" fluid v-else>
      <v-card-text class="d-flex justify-content-center mt-5">
        <v-chip-group
          mandatory
          active-class="red darken-4 white--text"
          v-model="selectedType"
          link
        >
          <v-chip class="mr-2" value="alle">
            <v-icon left :color="selectedType == 'alle' ? 'white' : 'black'">
              mdi-all-inclusive
            </v-icon>
            Alles
          </v-chip>
          <v-chip class="mr-2" value="diagramme">
            <v-icon
              left
              :color="selectedType == 'diagramme' ? 'white' : 'black'"
            >
              mdi-chart-bar
            </v-icon>
            Diagramme
          </v-chip>
          <v-chip value="firmen-feedback">
            <v-icon
              left
              :color="selectedType == 'firmen-feedback' ? 'white' : 'black'"
            >
              mdi-thumbs-up-down-outline
            </v-icon>
            Firmen Feedback
          </v-chip>
        </v-chip-group>
      </v-card-text>

      <!-- Diagramme -->
      <div v-show="selectedType == 'alle' || selectedType == 'diagramme'">
        <v-card-title class=" ml-0 pl-0 pt-0 ">
          <v-row class="mb-0">
            <v-col cols="1">
              <v-icon large color="black">
                mdi-chart-bar
              </v-icon>
            </v-col>
            <v-col cols="11">
              <v-divider class="mx-4"></v-divider>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row class="pt-0 mt-5 justify-content-center text-center ma-md-10 ">
          <v-row class="pt-0 mt-0 ">
            <v-card
              class="d-flex flex-wrap pa-5 justify-content-center"
              elevation="2"
            >
              <v-col
                cols="12"
                sm="6"
                md="4 "
                class="pa-5"
                style="align-self: self-end;"
              >
                <v-progress-circular
                  :rotate="360"
                  :size="170"
                  :width="20"
                  :value="(feedbacks.length / 40) * 100"
                  color="red darken-4"
                >
                  <h3>
                    {{ feedbacks.length }}/{{ nurTeilnehmer.length }}
                    <!-- {{
                      antraege.filter((el) => el.status == 'Teilnehmer').length
                    }} -->
                  </h3>
                </v-progress-circular>

                <v-card-text class="pt-10">
                  <div class="text-h6 font-weight-light mb-2">
                    Feedbacks gegeben
                  </div>

                  <v-divider class="my-2"></v-divider>
                  <v-icon class="mr-2" small>
                    mdi-clock
                  </v-icon>
                  <span
                    class="text-caption grey--text font-weight-light hidden-md-only"
                    >Letztes Feedback
                  </span>
                  <span class="font-weight-bold">
                    {{
                      feedbacks[0]
                        ? new Date(
                            feedbacks[0].feedback_zeitpunkt,
                          ).toLocaleDateString()
                        : 'N/A'
                    }}
                  </span>
                </v-card-text>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                class="pa-5"
                style="align-self: self-end;"
              >
                <div
                  class="d-flex"
                  style="justify-content:center;align-items:center"
                >
                  <span class="font-weight-bold">Kommunikation</span>
                  <v-rating
                    :value="6 - durchschnittKommunikation"
                    readonly
                    half-increments
                    empty-icon="mdi-circle-outline"
                    full-icon="mdi-checkbox-blank-circle"
                    half-icon="mdi-circle-half-full"
                    class="ml-2"
                    color="red darken-4"
                    background-color="red darken-4"
                  ></v-rating>
                </div>
                <div
                  class="d-flex"
                  style="justify-content:center;align-items:center"
                >
                  <span class="font-weight-bold">Teilnahme Prozess</span>
                  <v-rating
                    :value="6 - durchschnittTeilnahmeProzess"
                    readonly
                    half-increments
                    empty-icon="mdi-circle-outline"
                    full-icon="mdi-checkbox-blank-circle"
                    half-icon="mdi-circle-half-full"
                    class="ml-2"
                    color="red darken-4"
                    background-color="red darken-4"
                  ></v-rating>
                </div>
                <div
                  class="d-flex"
                  style="justify-content:center;align-items:center"
                >
                  <span class="font-weight-bold">Organisation</span>
                  <v-rating
                    :value="6 - durchschnittOrganisation"
                    readonly
                    half-increments
                    empty-icon="mdi-circle-outline"
                    full-icon="mdi-checkbox-blank-circle"
                    half-icon="mdi-circle-half-full"
                    class="ml-2"
                    color="red darken-4"
                    background-color="red darken-4"
                  ></v-rating>
                </div>

                <v-card-text class="pt-10">
                  <div class="text-h6 font-weight-light mb-2">
                    Durchschn. Zufriedenheit
                  </div>

                  <v-divider class="my-2"></v-divider>
                  <v-icon class="mr-2" small>
                    mdi-star-settings
                  </v-icon>
                </v-card-text>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4 "
                class="pa-5"
                style="align-self: self-end;"
              >
                <v-progress-linear
                  rounded
                  dark
                  background-color="grey"
                  background-opacity="0.3"
                  :value="
                    feedbacks.filter((el) => el.gesamt_zufriedenheit == '😁')
                      .length
                  "
                  height="19"
                  color="#D50000"
                >
                  <template>
                    <strong>😁</strong>
                  </template>
                </v-progress-linear>
                <br />
                <v-progress-linear
                  rounded
                  dark
                  background-color="grey"
                  background-opacity="0.3"
                  :value="
                    (feedbacks.filter((el) => el.gesamt_zufriedenheit == '😃')
                      .length /
                      feedbacks.length) *
                      100
                  "
                  height="19"
                  color="#D50000"
                >
                  <template>
                    <strong>😃</strong>
                  </template>
                </v-progress-linear>
                <br />
                <v-progress-linear
                  rounded
                  dark
                  background-color="grey"
                  background-opacity="0.3"
                  :value="
                    feedbacks.filter((el) => el.gesamt_zufriedenheit == '🙂')
                      .length
                  "
                  height="19"
                  color="#D50000"
                >
                  <template>
                    <strong>🙂</strong>
                  </template>
                </v-progress-linear>
                <br />
                <v-progress-linear
                  rounded
                  dark
                  background-color="grey"
                  background-opacity="0.3"
                  :value="
                    feedbacks.filter((el) => el.gesamt_zufriedenheit == '😕')
                      .length
                  "
                  height="19"
                  color="#D50000"
                >
                  <template>
                    <strong>😕</strong>
                  </template>
                </v-progress-linear>
                <br />
                <v-progress-linear
                  rounded
                  dark
                  background-color="grey"
                  background-opacity="0.3"
                  :value="
                    feedbacks.filter((el) => el.gesamt_zufriedenheit == '🙁')
                      .length
                  "
                  height="19"
                  color="#D50000"
                >
                  <template>
                    <strong>🙁</strong>
                  </template>
                </v-progress-linear>

                <v-card-text class="pt-10 ">
                  <div class="text-h6 font-weight-light mb-2">
                    Gesamt Zufriedenheit
                  </div>

                  <v-divider class="my-2"></v-divider>
                  <v-icon class="mr-2" small>
                    mdi-human-female-dance
                  </v-icon>
                </v-card-text>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="3" class="pa-5">
                    <v-sheet
                      class="v-sheet--offset mx-auto"
                      color="red darken-4"
                      elevation="12"
                      max-width="calc(100% - 32px)"
                    >
                      <v-sparkline
                        :labels="labels"
                        :value="value"
                        color="white"
                        line-width="2"
                        padding="16"
                      ></v-sparkline>
                    </v-sheet>
  
                    <v-card-text class="pt-0">
                      <div class="text-h6 font-weight-light mb-2">
                        User Registrations
                      </div>
                      <div class="subheading font-weight-light grey--text">
                        Last Campaign Performance
                      </div>
                      <v-divider class="my-2"></v-divider>
                      <v-icon class="mr-2" small>
                        mdi-clock
                      </v-icon>
                      <span class="text-caption grey--text font-weight-light"
                        >last registration 26 minutes ago</span
                      >
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="6" md="3" class="pa-5">
                    <v-sheet
                      class="v-sheet--offset mx-auto"
                      color="red darken-4"
                      elevation="12"
                      max-width="calc(100% - 32px)"
                    >
                      <v-sparkline
                        :labels="labels"
                        :value="value"
                        color="white"
                        line-width="2"
                        padding="16"
                      ></v-sparkline>
                    </v-sheet>
  
                    <v-card-text class="pt-0">
                      <div class="text-h6 font-weight-light mb-2">
                        User Registrations
                      </div>
                      <div class="subheading font-weight-light grey--text">
                        Last Campaign Performance
                      </div>
                      <v-divider class="my-2"></v-divider>
                      <v-icon class="mr-2" small>
                        mdi-clock
                      </v-icon>
                      <span class="text-caption grey--text font-weight-light"
                        >last registration 26 minutes ago</span
                      >
                    </v-card-text>
                  </v-col> -->
            </v-card>
          </v-row>
          <v-col cols="12" md="7"
            ><v-card
              class="pa-md-10 pa-5  "
              min-height="700"
              max-height="700"
              elevation="2"
            >
              <p class="text-body-1">
                Teilnahme Prozess der Veranstaltung
              </p>
              <BarChart :feedbackdata="feedbackdata" /> </v-card
          ></v-col>
          <v-col cols="12" md="5">
            <v-row class="ma-0 pa-0">
              <v-col class="mx-2 pa-0 pb-1">
                <v-card
                  elevation="2"
                  class="pa-md-10 pa-5 centered"
                  :min-height="$vuetify.breakpoint.name == 'sm' ? 402 : 298"
                  :max-height="298"
                >
                  <p class="text-body-1">
                    Erneute Teilnahme
                  </p>

                  <v-container class="d-flex justify-content-center mt-0 pt-0">
                    <PieChart
                      :feedbackdata="feedbackdata.organisiert"
                    /> </v-container
                ></v-card>
              </v-col>
              <v-col class="mx-2 pa-0 pb-1">
                <v-card
                  elevation="2"
                  class="pa-md-10 pa-5 centered"
                  min-height="399"
                  max-height="399"
                >
                  <p class="text-body-1">
                    Dauer der Veranstaltung
                  </p>

                  <v-container class="d-flex justify-content-center mt-0 pt-0">
                    <DonutChart
                      :feedbackdata="feedbackdata.organisiert"
                    /> </v-container
                ></v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <!-- Jede Firma -->
      <div
        v-show="selectedType == 'firmen-feedback' || selectedType == 'alle'"
        class="mt-16"
      >
        <v-card-title class="ml-0 pl-0">
          <span class="text-h5">Firmen Feedbacks </span>
          <v-spacer></v-spacer>
          <v-select
            v-model="zufriedenheit"
            :items="['😁', '😃', '🙂', '😕', '🙁']"
            chips
            label="Zufriedenheit"
            multiple
            solo
            hide-details
          ></v-select>
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <div v-if="filterFeedbacks.length != 0" class="pa-md-10 ">
          <v-expansion-panels focusable popout>
            <v-expansion-panel
              v-for="f of filterFeedbacks"
              :key="f.feedback_id"
              class="ma-2 "
            >
              <v-expansion-panel-header
                expand-icon="mdi-thumbs-up-down-outline"
              >
                <v-row no-gutters>
                  <v-col cols="4">
                    <span class="font-weight-black">{{ f.firmen_name }}</span>
                  </v-col>
                  <v-col cols="8" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <v-row no-gutters style="width: 100%">
                        <v-col cols="6">
                          Datum:
                          <span class="font-weight-bold">
                            {{
                              new Date(
                                f.feedback_zeitpunkt.substring(0, 10),
                              ).toLocaleDateString()
                            }}
                          </span>
                        </v-col>
                        <v-col cols="6">
                          {{ f.gesamt_zufriedenheit }}
                        </v-col>
                      </v-row>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-subheader class="pl-0 ml-0">
                      Was hat Ihnen am Karrieretag gefallen?
                    </v-subheader>
                    {{ f.gefallen }}
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-subheader class="pl-0 ml-0">
                      Was hat Ihnen am Karrieretag nicht gefallen?
                    </v-subheader>
                    {{ f.nicht_gefallen }}
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-divider></v-divider>

                    <v-subheader class="pl-0 ml-0">
                      Wie fanden Sie die Organisation der Veranstaltung?
                    </v-subheader>
                    {{ f.organisiert }}
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-divider></v-divider>

                    <v-subheader class="pl-0 ml-0">
                      Wie fanden Sie die Kommunikation mit dem Organisator?
                    </v-subheader>
                    {{
                      !f.kommunikation || getSchulnotenInText(f.kommunikation)
                    }}
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-divider></v-divider>

                    <v-subheader class="pl-0 ml-0">
                      Wie fanden sie den Teilnahme Prozess der Veranstaltung?
                    </v-subheader>
                    {{
                      !f.teilnahme_prozess ||
                        getSchulnotenInText(f.teilnahme_prozess)
                    }}
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-divider></v-divider>

                    <v-subheader class="pl-0 ml-0">
                      War die Dauer der Veranstaltung zu lang, zu kurz oder
                      ungefähr richtig?
                    </v-subheader>

                    {{ f.dauer }}
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-divider></v-divider>

                    <v-subheader class="pl-0 ml-0">
                      Würden Sie erneut an dem Karrieretag teilnehmen?
                    </v-subheader>
                    {{ f.erneute_teilnahme ? 'Ja' : 'Nein' }}
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-divider></v-divider>

                    <v-subheader class="pl-0 ml-0">
                      Hat Ihnen etwas gefehlt?
                    </v-subheader>
                    <span
                      :class="f.kommentar ? '' : 'text--secondary font-italic'"
                      >{{ f.kommentar || 'Wurde nicht ausgefüllt' }}</span
                    >
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <div v-else class="mx-0 my-5 ma-lg-10 center">
          <p><i>No data available</i></p>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import BarChart from '@/components/BarChart.vue';
import PieChart from '@/components/PieChart.vue';
import DonutChart from '@/components/DonutChart.vue';
export default {
  components: {
    BarChart,
    PieChart,
    DonutChart,
  },
  props: {
    karrieretagDaten: {
      type: Object,
    },
    antraege: {
      type: Array,
    },
  },
  methods: {
    checkDate() {
      return;
    },
    async getFeedbacks() {
      const { data } = await axios({
        url: '/feedbacks',
        method: 'GET',
      });
      this.feedbacks = data;
    },
    async getFeedbackData() {
      const { data } = await axios({
        url: '/feedbackdata',
        method: 'GET',
      });
      this.feedbackdata = data;
    },
    getSchulnotenInText(nummer) {
      const notenInText = [
        'Sehr gut',
        'Gut',
        'Zufriedenstellend',
        'Nicht gut',
        'Gar nicht gut',
      ];
      return notenInText[nummer - 1];
    },
    getAvgVotes() {
      const kommunikationFeedback = this.feedbacks.map((el) =>
        Number(el.kommunikation),
      );
      const teilnahmeProzessFeedback = this.feedbacks.map((el) =>
        Number(el.teilnahme_prozess),
      );
      const organisiertFeedback = this.feedbacks.map((el) =>
        this.convertLikeLabel(el.organisiert),
      );
      this.durchschnittKommunikation =
        kommunikationFeedback.reduce((a, b) => a + b, 0) /
        kommunikationFeedback.length;
      this.durchschnittTeilnahmeProzess =
        teilnahmeProzessFeedback.reduce((a, b) => a + b, 0) /
        teilnahmeProzessFeedback.length;
      this.durchschnittOrganisation =
        organisiertFeedback.reduce((a, b) => a + b, 0) /
        organisiertFeedback.length;
    },
    convertLikeLabel(kategorie) {
      switch (kategorie) {
        case 'Sehr gut organisiert':
          return 1;
        case 'Sehr organisiert':
          return 2;
        case 'Etwas organisiert':
          return 3;
        case 'Nicht so organisiert':
          return 4;
        case 'Überhaupt nicht organisiert':
          return 5;
        default:
          return 'diesdas';
      }
    },
  },
  async created() {
    await this.getFeedbacks();
    await this.getFeedbackData();
    this.getAvgVotes();
  },
  computed: {
    nurTeilnehmer() {
      return this.antraege.filter(
        (el) => el.status == 'Teilnehmer' || el.status == 'teilnehmer',
      );
    },
    filterFeedbacks() {
      if (this.zufriedenheit.length > 0) {
        return this.feedbacks.filter(
          (el) =>
            el.firmen_name.toLowerCase().includes(this.search.toLowerCase()) &&
            this.zufriedenheit.includes(el.gesamt_zufriedenheit),
        );
      } else {
        return this.feedbacks.filter((el) =>
          el.firmen_name.toLowerCase().includes(this.search.toLowerCase()),
        );
      }
    },
  },
  data: () => ({
    durchschnittKommunikation: null,
    durchschnittTeilnahmeProzess: null,
    durchschnittOrganisation: null,
    selectedType: 'alle',
    feedbacks: [],
    feedbackdata: {},
    search: '',
    labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    value: [200, 675, 410, 390, 310, 460, 250, 240],
    zufriedenheit: '',
  }),
};
</script>

<style>
.v-sheet--offset {
  top: -40px;
  position: relative;
}
.centered {
  display: flex;
  align-items: center;
  flex-flow: wrap;
  justify-content: center;
}
</style>
