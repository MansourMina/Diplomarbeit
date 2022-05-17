<template>
  <div>
    <v-container
      v-if="user.checkFeedback || checkFeedback || user.user.feedback"
      fill-height
      class="pa-16 centerBanner"
      style="height: 80vh"
    >
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-alert border="top" colored-border type="success" elevation="2">
            Sehr geehrte <b>{{ user.user.firmen_name }}</b
            >,<br />
            vielen Dank für Ihr Feedback!
            <br />
            Durch Ihr Feedback können wir die zukünftigen Karrieretage noch
            besser gestalten.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-progress-linear
        :value="getProgress"
        color="green"
        height="25"
        bottom
        fixed
      >
        <template v-slot:default="{ value }">
          <strong :class="getProgress >= 50 ? 'white--text' : ''"
            >{{ Math.ceil(value) }}%</strong
          >
        </template>
      </v-progress-linear>
      <v-card class="grey lighten-3 "
        ><v-card-title class="text-uppercase justify-center font-weight-bold ">
          Karrieretag Feedback Forum
        </v-card-title>
      </v-card>
      <v-row class="mt-5">
        <v-col cols="2" style="margin-right: -30px">
          <v-subheader class="px-0">Event Title</v-subheader>
        </v-col>
        <v-col cols="10">
          <v-text-field solo readonly v-model="getYear"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="4" md="2" style="margin-right: -30px">
          <v-subheader class="px-0">Date of Event</v-subheader>
        </v-col>
        <v-col cols="8" md="3">
          <v-text-field solo dense readonly v-model="getDatum"></v-text-field>
        </v-col>
        <v-col cols="4" offset-md="1" md="2" style="margin-right: -60px">
          <v-subheader class="px-0">Event Location</v-subheader>
        </v-col>
        <v-col cols="8" md="4">
          <v-text-field
            solo
            dense
            readonly
            v-model="eventLocation"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-10">
        <v-col>
          <v-subheader class="px-0">
            Bitte beantworten Sie die folgenden Fragen, indem Sie für jede Frage
            die vorhergesehene Antwortmöglichkeit ausfüllen. Es gibt ein
            separates Feld für Kommentare, die Sie verwenden können, um eine
            niedrige Punktzahl zu erklären und/oder wenn Sie Kritik oder
            Verbesserungsvorschläge haben. Ihre Meinung ist uns sehr wichtig und
            wird uns helfen, den Karrieretag zu verbessern.
          </v-subheader>
        </v-col>
      </v-row>
      <ul>
        <li>
          <v-row class="mt-5">
            <v-col cols="12"
              ><span
                >Insgesamt war Ihre Zufriedenheit mit dem Karrieretag...
              </span></v-col
            >
            <v-col cols="12" md="6" class="mt-4">
              <v-slider
                :thumb-size="35"
                thumb-label="always"
                color="red darken-4"
                v-model="gesamt_zufriedenheit"
                track-color="red darken-4"
              >
                <template v-slot:thumb-label="{ value }">
                  <span style="font-size: 20px">
                    {{
                      satisfactionEmojis[Math.min(Math.floor(value / 25), 5)]
                    }}
                  </span>
                </template>
              </v-slider>
            </v-col>
          </v-row>
        </li>
        <li>
          <v-row class="mt-5">
            <v-col cols="12"
              ><span>Was hat Ihnen am Karrieretag gefallen?</span></v-col
            >
            <v-col cols="12" md="6">
              <v-textarea
                filled
                name="input-7-4"
                v-model.trim="gefallen"
              ></v-textarea>
            </v-col>
          </v-row>
        </li>
        <li>
          <v-row class="mt-5">
            <v-col cols="12"
              ><span
                >Was hat Ihnen am Karrieretag <b>nicht</b> gefallen?</span
              ></v-col
            >
            <v-col cols="12" md="6">
              <v-textarea
                filled
                name="input-7-4"
                v-model.trim="nicht_gefallen"
              ></v-textarea>
            </v-col>
          </v-row>
        </li>
        <li>
          <v-row class="mt-5">
            <v-col cols="12"
              ><span
                >Wie fanden Sie die Organisation der Veranstaltung?
              </span></v-col
            >
            <v-col cols="6">
              <v-radio-group class="mt-0" v-model="organisiert">
                <v-radio
                  color="red darken-4"
                  v-for="n of organizationRadio"
                  :key="n"
                  :label="n"
                  :value="n"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </li>
        <li>
          <v-row class="mt-5 mb-8">
            <v-col cols="12"
              ><span
                >Wie fanden Sie die Kommunikation mit dem Organisator?
              </span></v-col
            >
            <div class="mt-5">
              <span
                class="text--secondary"
                style="position:absolute; margin-top:-11px"
                >Sehr gut</span
              >
              <span
                class="text--secondary"
                style="position:absolute; margin-top:-11px; margin-left:155px"
                >Gar nicht gut</span
              >
            </div>
            <v-col cols="8">
              <div class="d-flex flex-column">
                <v-btn-toggle
                  v-model="kommunikation"
                  active-class="red darken-4"
                  color="white"
                >
                  <v-btn v-for="n in 5" :key="n">
                    {{ n }}
                  </v-btn>
                </v-btn-toggle>
              </div>
            </v-col>
            <!-- <v-col cols="5" v-if="kommunikation > 4">
              <v-textarea
                filled
                label="Schildern Sie uns Ihre Meinung (optional)"
                height="10"
                width="10"
              ></v-textarea>
            </v-col> -->
          </v-row>
        </li>
        <li>
          <v-row class="mt-5 mb-8">
            <v-col cols="12"
              ><span
                >Wie fanden sie den Teilnahme Prozess der Veranstaltung?
              </span></v-col
            >
            <div class="mt-5">
              <span
                class="text--secondary"
                style="position:absolute; margin-top:-11px"
              >
                Sehr gut
              </span>
              <span
                class="text--secondary"
                style="position:absolute; margin-top:-11px; margin-left:155px"
                >Gar nicht gut</span
              >
            </div>
            <v-col cols="6">
              <v-btn-toggle
                v-model="teilnahme_prozess"
                active-class="red darken-4"
                color="white"
              >
                <v-btn v-for="n in 5" :key="n">
                  {{ n }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </li>
        <li>
          <v-row class="mt-5">
            <v-col cols="12"
              ><span
                >War die Dauer der Veranstaltung zu lang, zu kurz oder
                ungefähr richtig?
              </span></v-col
            >
            <v-col cols="6">
              <v-radio-group class="mt-0" v-model="dauer">
                <v-radio
                  color="red darken-4"
                  v-for="n of dauerRadio"
                  :key="n"
                  :label="n"
                  :value="n"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </li>
        <li>
          <v-row class="mt-5">
            <v-col cols="12"
              ><span
                >Würden Sie erneut an dem Karrieretag teilnehmen?
              </span></v-col
            >
            <v-col cols="6">
              <v-radio-group class="mt-0" v-model="erneute_teilnahme">
                <v-radio
                  label="Ja"
                  :value="true"
                  color="red darken-4"
                ></v-radio>
                <v-radio
                  label="Nein"
                  :value="false"
                  color="red darken-4"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </li>
        <li>
          <v-row class="mt-5">
            <v-col cols="12"
              ><span
                >Hat Ihnen etwas gefehlt?
                <span class="text--secondary">(optional)</span>
              </span></v-col
            >
            <v-col cols="12" md="6">
              <v-textarea
                filled
                name="input-7-4"
                v-model.trim="kommentar"
              ></v-textarea>
            </v-col>
          </v-row>
        </li>
      </ul>
      <v-btn
        class="red darken-4 tile white--text d-block m-auto mt-10"
        :disabled="getProgress != 100"
        @click="absenden()"
        >Absenden</v-btn
      >
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  created() {
    this.getUser();
  },
  props: {
    karrieretagDaten: {
      type: Object,
    },

  },

  methods: {
    getUser() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user != null) {
        this.user = user;
        this.firmen_id = user.user.firmen_id;
      }
    },
    async pushHistory() {
      await axios({
        url: '/activities',
        method: 'POST',
        contentType: 'application/json',
        data: {
          type: 'Feedback',
          time: new Date(),
          firmen_id: this.firmen_id,
        },
      });
    },
    async absenden() {
      if (this.getProgress == 100) {
        await axios({
          url: '/feedback',
          method: 'POST',
          contentType: 'application/json',
          data: {
            dauer: this.dauer,
            gefallen: this.gefallen,
            nicht_gefallen: this.nicht_gefallen,
            gesamt_zufriedenheit: this.satisfactionEmojis[
              Math.min(Math.floor(this.gesamt_zufriedenheit / 25), 5)
            ],
            teilnahme_prozess: this.teilnahme_prozess + 1,
            kommentar: this.kommentar,
            erneute_teilnahme: this.erneute_teilnahme,
            organisiert: this.organisiert,
            kommunikation: this.kommunikation + 1,
            firmen_id: this.firmen_id,
            zeitpunkt: new Date(),
          },
        });
        this.checkFeedback = true;
        this.user.checkFeedback = true;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.pushHistory();
      }
    },
  },
  computed: {
    getDatum() {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const date = new Date(this.karrieretagDaten.datum);
      return `${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
    },
    getYear() {
      const date = new Date(this.karrieretagDaten.datum);
      return this.eventTitle + `${date.getFullYear()}`;
    },
    getProgress() {
      const toBeFilled = [
        this.dauer,
        this.nicht_gefallen,
        this.gefallen,
        this.gesamt_zufriedenheit,
        this.teilnahme_prozess,
        this.erneute_teilnahme,
        this.organisiert,
        this.kommunikation,
      ];
      return (
        toBeFilled.filter((el) => String(el) != '' && el != null).length *
        (100 / toBeFilled.length)
      );
    },
  },
  data() {
    return {
      dauer: '',
      user: {},
      nicht_gefallen: '',
      gefallen: '',
      gesamt_zufriedenheit: '',
      teilnahme_prozess: '',
      kommentar: '',
      checkFeedback: false,
      erneute_teilnahme: '',
      organizationRadio: [
        'Sehr gut organisiert',
        'Sehr organisiert',
        'Etwas organisiert',
        'Nicht so organisiert',
        'Überhaupt nicht organisiert',
      ],
      dauerRadio: [
        'Viel zu lang',
        'Zu lang',
        'Ungefähr richtig',
        'Zu kurz',
        'Viel zu kurz',
      ],
      organisiert: '',
      kommunikation: '',
      number: 0,
      eventTitle: 'Karrieretag der HTL Wien West ',
      dateEvent: '',
      eventLocation: 'Thaliastraße 125, 1160 Wien',
      satisfactionEmojis: ['😁', '😃', '🙂', '😕', '🙁'],
      slider: 45,
    };
  },
};
</script>

<style lang="scss" scoped></style>
