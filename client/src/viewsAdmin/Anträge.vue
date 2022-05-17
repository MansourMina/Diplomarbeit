<template>
  <v-container fluid>
    <div class=" red darken-4 white--text text-center mx-0 my-5 ma-lg-10">
      <v-row class="mt-2 pa-5 pb" align="center" text-center>
        <v-col cols="12" md="3">
          <span
            style="font-size: 1.25rem;font-weight: 500;letter-spacing: 0.0125em;"
          >
            FIRMEN ANTRÄGE
          </span></v-col
        >
        <v-col cols="12" md="4">
          <v-text-field
            v-model="search"
            hide-details
            label="Nach Firma suchen..."
            solo
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
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
        <v-col>
          <v-dialog v-model="dialog" max-width="1000">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                @click="passData()"
                :disabled="selected.length == 0"
              >
                <v-icon color="white" x-large>mdi-email-plus</v-icon>
              </v-btn>
            </template>
            <SendEmail
              :selectedEmails="selectedEmails"
              @closeDialog="closeDialog()"
            />
            <!-- @deSelectFirma="deSelectFirma" -->
          </v-dialog>
        </v-col>
      </v-row>
    </div>

    <v-card
      class="mx-0 my-5 ma-lg-10 "
      min-height="500"
      v-if="!loaded"
      elevation="0"
    >
      <v-skeleton-loader
        class="mx-auto"
        type="table-tbody"
        :loading="loading"
        transition="fade-transition"
        v-for="i in 2"
        :key="i"
      ></v-skeleton-loader>
    </v-card>
    <div v-else>
      <v-card
        class="mx-0 my-5 ma-lg-10 center"
        min-height="500"
        elevation="0"
        v-if="filterAnträge.length == 0"
      >
        <div>
          <p><i>No data available</i></p>
        </div>
      </v-card>
      <v-card
        class="mx-0 my-5 ma-lg-10"
        min-height="500"
        v-else
        elevation="0"
        max
      >
        <v-simple-table class="ma-5 ">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  <v-checkbox
                    @click="SelectAll()"
                    v-model="allSelected"
                  ></v-checkbox>
                </th>
                <th align="left">
                  Name
                </th>
                <th class="text-center">
                  Email
                </th>
                <th class="text-center">
                  Datum
                </th>
                <th class="text-center">
                  Status
                </th>
                <th class="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="text-center">
              <template v-for="item in filterAnträge">
                <tr :key="item.firmen_id">
                  <td>
                    <v-checkbox
                      v-model="selected"
                      :value="item.firmen_id"
                      @click="allSelected = false"
                    ></v-checkbox>
                  </td>
                  <td align="left">{{ item.firmen_name }}</td>
                  <td>{{ item.firmen_mail }}</td>
                  <td>
                    {{
                      new Date(
                        item.anfrage_zeitpunkt.substring(0, 10),
                      ).toLocaleDateString()
                    }}
                  </td>
                  <td v-if="item.status == 'Anfrage'">
                    <v-chip color="primary" dark small>{{
                      item.status
                    }}</v-chip>
                  </td>
                  <td v-if="item.status == 'Abgelehnt'">
                    <v-chip color="error" small>{{ item.status }}</v-chip>
                  </td>
                  <td v-if="item.status == 'Teilnehmer'">
                    <v-chip color="success" small>{{ item.status }}</v-chip>
                  </td>
                  <td v-if="item.status == 'Daten erhalten'">
                    <v-chip color="blue-grey" class="white--text" small>{{
                      item.status
                    }}</v-chip>
                  </td>
                  <td class="px-5">
                    <div v-if="item.status == 'Teilnehmer'">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            icon
                            v-on="on"
                            @click="
                              dialogData = true;
                              selectedItem = item;
                            "
                          >
                            <v-icon> mdi-menu</v-icon>
                          </v-btn>
                        </template>
                        <span>Details</span>
                      </v-tooltip>
                      <v-tooltip top v-if="item.buchhaltung_gesendet != true">
                        <template v-slot:activator="{ on }">
                          <v-btn
                            icon
                            class="ml-3"
                            v-on="on"
                            @click="
                              firma = item;
                              generateReport();
                            "
                          >
                            <v-icon> mdi-book-open</v-icon>
                          </v-btn>
                        </template>
                        <span>Buchhaltung senden</span>
                      </v-tooltip>
                    </div>
                    <div
                      v-if="
                        item.status != 'Abgelehnt' &&
                          item.status != 'Teilnehmer' &&
                          item.status != 'Daten erhalten'
                      "
                    >
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            icon
                            @click="seen(item)"
                            v-if="!item.gesehen"
                            v-on="on"
                            ><v-icon color="black" dark small
                              >mdi-eye</v-icon
                            ></v-btn
                          >
                        </template>
                        <span>Bestätigen</span>
                      </v-tooltip>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            v-on="on"
                            icon
                            @click="changeStatus('Abgelehnt', item)"
                          >
                            <v-icon color="red darken-4" small
                              >mdi-archive-remove-outline</v-icon
                            ></v-btn
                          >
                        </template>
                        <span>Ablehnen</span>
                      </v-tooltip>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            v-on="on"
                            icon
                            @click="changeStatus('Daten erhalten', item)"
                            ><v-icon color="primary" dark small
                              >mdi-email-check-outline</v-icon
                            ></v-btn
                          >
                        </template>
                        <span>Annehmen</span>
                      </v-tooltip>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table>

        <v-dialog v-model="dialogData" max-width="600px">
          <ShowData @close="dialogData = false" :user="selectedItem" />
        </v-dialog>
      </v-card>
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarcolor">
      <span :class="`${color}--text`">{{ message }}</span>

      <template v-slot:action="{ attrs }">
        <v-btn :color="color" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <VueHtml2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="false"
      :preview-modal="true"
      :paginate-elements-by-height="1100"
      filename="Karrieretag 2022 Liste"
      :pdf-quality="2"
      :manual-pagination="true"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="100%"
      ref="html2Pdf"
      @hasDownloaded="hasDownloaded($event)"
    >
      <section slot="pdf-content">
        <Buchhaltung :firma="firma" :antraege="antraege" />
      </section>
    </VueHtml2pdf>
  </v-container>
</template>

<script>
import { bus } from '../main';
import VueHtml2pdf from 'vue-html2pdf';
import Buchhaltung from '@/components/Buchhaltung.vue';
import axios from 'axios';
import SendEmail from '@/components/SendEmail.vue';
import ShowData from '@/components/ShowData.vue';
export default {
  components: {
    SendEmail,
    ShowData,
    VueHtml2pdf,
    Buchhaltung,
  },
  props: {
    antraege: {
      type: Array,
    },
  },
  data() {
    return {
      search: '',
      message: '',
      snackbar: false,
      timeout: 5000,
      selected: [],
      calories: '',
      color: '',
      status: [],
      snackbarcolor: 'none',
      statuse: ['Anfrage', 'Abgelehnt', 'Teilnehmer', 'Daten erhalten'],
      dialog: false,
      allSelected: false,
      dialogData: false,
      selectedItem: {},
      loaded: false,
      loading: true,
      base64: null,
      firma: {},
    };
  },

  computed: {
    selectedEmails() {
      return this.antraege.filter((el) => this.selected.includes(el.firmen_id));
    },
    headers() {
      return [
        {
          text: 'Name',
        },
        {
          text: 'Email',
        },
        { text: 'Anfrage Datum' },
        { text: 'Status' },
      ];
    },

    filterAnträge() {
      if (this.status.length > 0) {
        return this.antraege.filter(
          (el) =>
            el.firmen_name.toLowerCase().includes(this.search.toLowerCase()) &&
            this.status.includes(el.status),
        );
      } else {
        return this.antraege.filter((el) =>
          el.firmen_name.toLowerCase().includes(this.search.toLowerCase()),
        );
      }
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

  methods: {
    async hasDownloaded(event) {
      await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(event);

        reader.onload = () =>
          this.sendEmailBuchhaltung(resolve(reader.result.split(',')[1]));
        reader.onerror = (error) => reject(error);
      });
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    passData() {
      bus.$emit('changeIt', this.selectedEmails);
    },
    async sendEmailBuchhaltung(base64) {
      await axios({
        url: '/buchaltung',
        method: 'POST',
        contentType: 'application/json',
        data: {
          firma: this.firma,
          file: `Karrieretag Rechnungsanschrift ${this.firma.firmen_name}`,
          base64: base64,
        },
      });

      this.message = `PDF der Rechnungsanschrift von Firma ${this.firma.firmen_name} gesendet`;
      this.snackbarcolor = 'red darken-4';
      this.color = 'white';
      this.snackbar = true;

      // weil das VueHtml2pdf ziemlich lange braucht und es ansonsten nicht aktualisiert wird
      setTimeout(() => {
        this.$emit('refreshAntraege');
      }, 1000);
    },
    async seen(item) {
      await axios({
        url: '/status/' + item.firmen_id,
        method: 'PATCH',
        contentType: 'application/json',
        data: {
          status: 'gesehen',
        },
      });
      this.message = 'Anfrage bestätigt!';
      this.snackbarcolor = 'grey lighten-4';
      this.color = 'black';
      this.snackbar = true;
      this.$emit('refreshAntraege');
      this.$emit('sendmail', {
        firmen_name: item.firmen_name,
        email: item.firmen_mail,
        type: 'gesehen',
      });
    },
    async changeStatus(status, item) {
      await axios({
        url: '/status/' + item.firmen_id,
        method: 'PATCH',
        contentType: 'application/json',
        data: {
          status: status,
        },
      });
      this.$emit('refreshAntraege');

      switch (status) {
        case 'Abgelehnt':
          this.$emit('sendmail', {
            firmen_name: item.firmen_name,
            email: item.firmen_mail,
            type: 'abgelehnt',
          });
          this.message = 'Antrag abgelehnt!';
          this.snackbarcolor = 'red darken-4';
          this.color = 'white';

          break;
        case 'Daten erhalten':
          const { data } = await axios({
            url: '/setanmeldedaten',
            method: 'POST',
            contentType: 'application/json',
            data: {
              firmen_id: item.firmen_id,
            },
          });
          this.message = 'Antrag angenommen!';
          this.snackbarcolor = 'success';
          this.color = 'white';
          this.$emit('sendmail', {
            firmen_name: item.firmen_name,
            email: item.firmen_mail,
            type: 'daten',
            user_id: data.user_id,
            passwort: data.passwort,
          });

          break;
        default:
          this.message = 'Fehler';
          this.snackbarcolor = 'red';
          this.color = 'white';
      }
      this.snackbar = true;
    },

    SelectAll() {
      this.selected = [];
      if (this.allSelected) {
        for (const item of this.filterAnträge) {
          if (this.selected.find((el) => el == item) == null) {
            this.selected.push(item.firmen_id);
          }
        }
      }
    },

    closeDialog() {
      this.dialog = false;
      this.allSelected = false;
      this.selected = [];
    },
  },
};
</script>

<style lang="scss" scoped></style>
