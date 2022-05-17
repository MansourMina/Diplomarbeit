<template>
  <v-container>
    <header class="text-center py-4 ">
      <h2 class="text-center text-uppercase font-weight-light ">
        Tragen Sie einen Vortrag ein
      </h2>
      <v-btn
        @click="eintragDialog = true"
        class="mt-5 red--text text--darken-4"
        outlined
        >Neuer Vortrag</v-btn
      >
    </header>
    <div class="text-center">
      <v-dialog v-model="eintragDialog" width="500">
        <v-card>
          <v-card-title class="red darken-4 white--text font-weight-medium"
            >Vortrags Daten</v-card-title
          >
          <v-form ref="form" v-model="valid">
            <div class="container">
              <v-select
                label="Firmen auswahl"
                :items="
                  alleFirmen
                    .filter(
                      (el) =>
                        !alleVorträge
                          .map((element) => element.firmen_id)
                          .includes(el.firmen_id),
                    )
                    .map((el) => el.firmen_name)
                "
                v-model="firma"
                required
                :rules="requiredRule"
                prepend-inner-icon="mdi-domain"
              ></v-select>
              <v-select
                required
                prepend-inner-icon="mdi-lan"
                :items="
                  firma.length > 0
                    ? alleFirmen
                        .find((el) => el.firmen_name == firma)
                        .vortrag_auswahl.split(',')
                    : []
                "
                v-model="vortrag_auswahl"
                :rules="requiredRule"
                label="Fachrichtung"
              >
              </v-select>

              <v-select
                v-model="uhrzeit"
                :items="uhrzeitAuswahl"
                label="Uhrzeit"
                :rules="requiredRule"
                prepend-inner-icon="mdi-alarm"
              ></v-select>
              <v-card-actions class="text-center">
                <v-btn
                  class="mx-auto red darken-4 white--text"
                  @click="postVortrag()"
                  :disabled="!valid"
                  >Eintragen</v-btn
                >
              </v-card-actions>
            </div>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center">
      <v-calendar
        ref="calendar"
        first-interval="23"
        interval-count="20"
        interval-minutes="20"
        v-model="today"
        :events="events"
        interval-height="50"
        :event-height="25"
        :value="today"
        :event-color="getEventColor"
        @contextmenu:event="showEvent"
        color="warning"
        type="day"
      >
        <template v-slot:day-body="{ date }">
          <div
            class="v-current-time"
            :class="{ first: date === date }"
            :style="{ top: nowY }"
            v-if="date < nowY"
          ></div>
        </template>
        <template v-slot:event="{ event }">
          <div>
            {{ event.name }}{{ event.start.substring(11, 16) }} -
            {{ event.end.substring(11, 16) }}
          </div>
        </template>
      </v-calendar>
      <v-menu
        v-model="showMenu"
        :position-x="x"
        :position-y="y"
        absolute
        offset-y
        style="max-width: 600px"
      >
        <v-list>
          <v-list-item @click="editDialog = true">
            <v-list-item-title>
              <v-icon>mdi-pencil</v-icon> Vortrag bearbeiten</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="deleteItem">
            <v-list-item-title>
              <v-icon>mdi-delete</v-icon> Vortrag löschen</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <v-dialog max-width="500" v-model="editDialog">
        <template v-slot:default="dialog">
          <v-card>
            <v-row class="pa-0 ma-0">
              <v-toolbar color="red darken-4" dark class="text-h6">{{
                selectedItem.name.split(' | ')[0]
              }}</v-toolbar>
              <v-col cols="12">
                <v-card-title>
                  Aktuelle Zeit:
                  {{ selectedItem.start.substring(10, 16) }} Uhr -
                  {{ selectedItem.end.substring(10, 16) }} Uhr
                </v-card-title>
              </v-col>

              <v-col cols="12">
                <v-select
                  label="Neue Vortrags Zeit"
                  class="container"
                  v-model="neueVortragszeit"
                  :items="uhrzeitAuswahl"
                ></v-select>
              </v-col>
              <v-card-actions class="justify-end">
                <v-btn
                  medium
                  text
                  color="teal"
                  class="ml-3"
                  @click="(dialog.value = false), patchUhrzeit(selectedItem)"
                  >Speichern</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  medium
                  text
                  color="red darken-4"
                  class="mr-3"
                  @click="dialog.value = false"
                  >Close</v-btn
                >
              </v-card-actions>
            </v-row>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    editDialog: false,
    ready: false,
    selectedItem: '',
    eintragDialog: false,
    valid: true,
    value: '',
    firma: '',
    anfang: '',
    ende: '',
    uhrzeit: '',
    uhrzeitAuswahl: [
      '08:00 - 08:10',
      '08:10 - 08:20',
      '08:20 - 08:30',
      '08:30 - 08:40',
      '08:40 - 08:50',
      '08:50 - 09:00',
      '09:00 - 09:10',
      '09:10 - 09:20',
      '09:20 - 09:30',
      '09:30 - 09:40',
      '09:40 - 09:50',
      '09:50 - 10:00',
      '10:00 - 10:10',
      '10:10 - 10:20',
      '10:20 - 10:30',
      '10:30 - 10:40',
      '10:40 - 10:50',
      '10:50 - 11:00',
      '11:00 - 11:10',
      '11:10 - 11:20',
      '11:20 - 11:30',
      '11:30 - 11:40',
      '11:40 - 11:50',
      '11:50 - 12:00',
      '12:00 - 12:10',
      '12:10 - 12:20',
      '12:20 - 12:30',
      '12:30 - 12:40',
      '12:40 - 12:50',
      '12:50 - 13:00',
      '13:00 - 13:10',
      '13:10 - 13:20',
      '13:20 - 13:30',
      '13:30 - 13:40',
      '13:40 - 13:50',
      '13:50 - 14:00',
    ],
    neueVortragszeit: '',
    events: [],
    vortrag_auswahl: '',
    alleFirmen: [],
    alleVorträge: [],
    neuerAnfang: [],
    neuesEnde: [],
    selects: [],

    clickedEvent: null,
    showMenu: false,
    x: 0,
    y: 0,
    requiredRule: [(v) => !!v || 'This field is required.'],
  }),

  async created() {
    this.sortUhrzeiten();
    await this.getFirmenNamen();
    await this.fetchData();
  },
  mounted() {
    this.ready = true;
    this.scrollToTime();
    this.updateTime();
  },
  props: {
    karrieretagDaten: {
      type: Object,
    },
  },
  methods: {
    sortUhrzeiten() {
      this.uhrzeitAuswahl.sort();
    },
    showEvent({ nativeEvent, event }) {
      nativeEvent.preventDefault();
      this.showMenu = false;
      this.x = nativeEvent.clientX;
      this.y = nativeEvent.clientY;
      this.clickedEvent = event;
      this.selectedItem = this.clickedEvent;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },

    async deleteItem() {
      const alteUhrzeit = `${this.clickedEvent.start.substring(
        11,
        16,
      )} - ${this.clickedEvent.end.substring(11, 16)}`;
      await axios({
        url: '/vortrag/' + this.clickedEvent.vortrag_id,
        method: 'DELETE',
      });
      this.uhrzeitAuswahl.push(alteUhrzeit);
      this.sortUhrzeiten();
      this.fetchData();
    },
    toTimestamp(strDate) {
      var datum = Date.parse(strDate);
      return datum / 1000;
    },

    getEventColor(event) {
      console.log(event)
      if (
        new Date().toLocaleDateString() ==
        new Date(this.karrieretagDaten.datum).toLocaleDateString()
      ) {
        if (event.end.substring(11, 19) < this.getHoursandMinutes) {
          return 'grey darken-3 ';
        }
      } else {
        switch (event.vortrag_auswahl) {
          case 'IT':
            return 'red darken-4';
          case 'E/ET':
            return 'indigo darken-4';
          case 'Maschinenbau':
            return 'teal darken-4';
          default:
            break;
        }
      }
    },

    async getFirmenNamen() {
      const { data } = await axios({
        url: '/firma',
        method: 'GET',
      });
      this.alleFirmen = data;
    },

    async fetchData() {
      const { data } = await axios({
        url: '/vortrag',
        method: 'GET',
      });
      this.alleVorträge = [];
      console.log(data)

      data.forEach((el) =>
        this.alleVorträge.push({
          uhrzeit: `${el.anfangvortrag.substring(
            0,
            5,
          )} - ${el.endevortrag.substring(0, 5)}`,
          vortrag_auswahl: el.vortrag_fachrichtung,
          firmen_id: el.firmen_id,
          vortrag_id: el.vortrag_id,
        }),
      );

      this.events = [];

      data.forEach((element) =>
        this.events.push({
          name:
            'Firmen Name: ' +
            element.firmen_name +
            ' | Fachrichtung: ' +
            element.vortrag_fachrichtung +
            ' | ',
          vortrag_auswahl: element.vortrag_fachrichtung,
          start: `${this.today} ${element.anfangvortrag}`,
          end: `${this.today} ${element.endevortrag}`,
          vortrag_id: element.vortrag_id,
        }),
      );
      this.uhrzeitAuswahl = this.uhrzeitAuswahl.filter(
        (el) => !this.alleVorträge.map((el) => el.uhrzeit).includes(el),
      );
    },

    async postVortrag() {
      try {
        this.anfang = this.uhrzeit.substr(0, 5);
        this.ende = this.uhrzeit.substr(8, 10);
        await axios({
          url: '/vortrag',
          method: 'POST',
          data: {
            anfangvortrag: this.anfang,
            firmen_id: this.alleFirmen.find(
              (el) => el.firmen_name == this.firma,
            ).firmen_id,
            fachrichtung: this.vortrag_auswahl,
            endevortrag: this.ende,
          },
        });
        this.fetchData();
        this.eintragDialog = false;
        (this.anfang = ''),
          (this.vortrag_auswahl = ''),
          (this.ende = ''),
          (this.uhrzeit = ''),
          (this.firma = '');
        this.$refs.form.resetValidation();
      } catch (err) {
        console.log('ERROR ---- ' + err);
      }
    },

    async patchUhrzeit(element) {
      const alteUhrzeit = `${element.start.substring(
        11,
        16,
      )} - ${element.end.substring(11, 16)}`;
      await axios({
        url: '/vortrag/' + element.vortrag_id,
        method: 'patch',
        contentType: 'application/json',
        data: {
          anfangvortrag: this.neueVortragszeit.substring(0, 5),
          endevortrag: this.neueVortragszeit.substring(8, 13),
        },
      });
      this.uhrzeitAuswahl.push(alteUhrzeit);
      this.sortUhrzeiten();
      this.fetchData();
    },
    getCurrentTime() {
      return this.cal
        ? this.cal.times.now.hour * 60 + this.cal.times.now.minute
        : 0;
    },
    scrollToTime() {
      const time = this.getCurrentTime();
      const first = Math.max(0, time - (time % 30) - 30);

      this.cal.scrollToTime(first);
    },
    updateTime() {
      setInterval(() => this.cal.updateTimes(), 60 * 1000);
    },
  },
  computed: {
    today: {
      get() {
        return new Date(this.karrieretagDaten.datum).toISOString().slice(0, 10);
      },
      set() {},
    },

    cal() {
      return this.ready ? this.$refs.calendar : null;
    },
    nowY() {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px';
    },
    getHoursandMinutes() {
      var today = new Date();
      return (
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.v-current-time {
  height: 2px;
  background-color: black;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;
  &.first::before {
    content: '';
    position: absolute;
    background-color: #8b0000;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
</style>
