<template>
  <!-- eslint-disable -->

  <v-container
    :style="toPdf ? 'padding: 80px 80px 100px 80px' : ''"
    :class="!toPdf ? 'pa-md-16' : ''"
  >
    <v-row class="mb-15 pb-16" v-if="toPdf">
      <v-col cols="7">
        <v-toolbar-title>
          <img
            src="@/assets/logo.jpg"
            height="120"
            name="Logo HTL Wien West"
            alt="Logo"
            title="HTL Wien West Logo"
          />
        </v-toolbar-title>
      </v-col>
      <v-col cols="5" class="grey--text text--darken-2">
        HTL Wien West<br />
        Thaliastraße 125, 1160 Wien <br />
        karrieretag@htlwienwest.at <br />
        www.htlwienwest.at<br />
      </v-col>
    </v-row>
    <v-row :style="toPdf ? 'margin-top:100px' : ''">
      <v-col cols="7">
        <h3 class="font-weight-bold">Karrieretag Teilnehmer</h3>
        <h5 class="font-weight-light">HTL Wien West</h5>
      </v-col>
      <v-col cols="5" v-if="toPdf">
        <h6>
          Report erstellt<span style="margin-left: 10px ">
            <b>{{ new Date().toString().substring(3, 15) }}</b></span
          >
        </h6>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table
        v-if="toPdf"
        :headers="pdfHeaders"
        :items="nurTeilnehmer"
        hide-default-footer
        :items-per-page="nurTeilnehmer.length"
        class="elevation-0 "
        style="margin-top: 20px"
      >
        <template v-slot:item.aufbauhilfe="{ item }">
          {{ item.aufbauhilfe ? 'Ja' : 'Nein' }}
        </template>
      </v-data-table>
      <v-data-table
        v-else
        :headers="headers"
        :items="nurTeilnehmer"
        class="elevation-0  my-10"
        style="background-color: none"
      >
        <template v-slot:item.aufbauhilfe="{ item }">
          {{ item.aufbauhilfe ? 'Ja' : 'Nein' }}
        </template>
        <template v-slot:item.sponsoring_interessiert="{ item }">
          {{ item.sponsoring_interessiert ? 'Ja' : 'Nein' }}
        </template>

        <template v-slot:item.vortrag_auswahl="{ item }">
          <span v-if="item.vortrag_auswahl != null"
            ><b>{{
              item.vortrag_auswahl
                .replaceAll(',', ' | ')
                .replace('Maschinenbau', 'M')
            }}</b>
          </span>
          <span v-else>Nein</span>
        </template>
        <template v-slot:item.platz="{ item }">
          {{ item.platz == 'Gang' ? 'G' : 'K' }}
        </template>
      </v-data-table>
    </v-row>
    <v-row style="margin-top: 50px;">
      <v-col style="text-align:right; padding-bottom: 0" cols="12"
        ><b>Teilnehmende Firmen:</b>
        <span class="ml-10" style="margin-left: 10px; font-weight:bold">{{
          nurTeilnehmer.length
        }}</span
        ><br
      /></v-col>

      <v-col style="text-align:right; padding-bottom: 0" cols="12"
        >Abgelehnte Firmen:
        <span class="ml-10" style="margin-left: 10px; font-weight:bold">{{
          nurAbgelehnt.length
        }}</span
        ><br
      /></v-col>
      <v-col style="text-align:right; padding-bottom: 0" cols="12"
        >Noch offen:
        <span class="ml-10" style="margin-left: 10px; font-weight:bold">{{
          nurOffen.length
        }}</span
        ><br
      /></v-col>
      <v-col style="text-align:right; " cols="12"
        >Daten bereits erhalten:
        <span class="ml-10" style="margin-left: 10px; font-weight:bold">{{
          nurDatenErhalten.length
        }}</span
        ><br
      /></v-col>
      <v-divider dark></v-divider>
      <v-col style="text-align:right; padding-top: 1px" cols="12"
        ><b>Anfragen Gesamt:</b>
        <span class="ml-10" style="margin-left: 10px; font-weight:bold">{{
          antraege.length
        }}</span
        ><br
      /></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    antraege: {
      type: Array,
    },
    toPdf: {
      type: Boolean,
    },
    karrieretagDaten: {
      type: Object,
    },
  },

  data() {
    return {
      count: 0,
      headers: [
        {
          text: 'Firmen Name',
          align: 'start',
          value: 'firmen_name',
        },
        {
          text: 'Mail',
          value: 'firmen_mail',
          sortable: false,
        },
        { text: 'Platz', value: 'platz' },

        { text: 'Aufbauhilfe', value: 'aufbauhilfe' },

        {
          text: 'Fachrichtung/en',
          value: 'fachrichtung',
        },
        {
          text: 'Vortrag?',
          value: 'vortrag_auswahl',
        },
        {
          text: 'Teilnehmer-Tel',
          value: 'ansprechpartner_teilnahme_tel',
          sortable: false,
        },
        {
          text: 'Teilnehmer-Mail',
          value: 'ansprechpartner_teilnahme_mail',
          sortable: false,
        },

        {
          text: 'Austellung-Tel',
          value: 'ansprechpartner_ausstellung_tel',
          sortable: false,
        },
        {
          text: 'Austellung-Mail',
          value: 'ansprechpartner_ausstellung_mail',
          sortable: false,
        },
        {
          text: 'Praktikum-Tel',
          value: 'tel_ferialpraktikum',
          sortable: false,
        },
        {
          text: 'Praktikum-Mail',
          value: 'mail_ferialpraktikum',
          sortable: false,
        },
        {
          text: 'Rechnung',
          value: 'rechnungsadresse',
          sortable: false,
        },
        {
          text: 'Sponsoring',
          value: 'sponsoring_interessiert',
        },
      ],
      pdfHeaders: [
        {
          text: 'Firmen Name',
          align: 'start',
          value: 'firmen_name',
        },
        { text: 'Aufbauhilfe', value: 'aufbauhilfe' },
        { text: 'Vortrag?', value: 'vortrag_auswahl' },
        { text: 'Ansprechpartner', value: 'ansprechpartner_teilnahme_tel' },
        { text: 'Platz', value: 'platz' },
      ],
    };
  },
  computed: {
    getYear() {
      if (this.karrieretagDaten) {
        const date = new Date(this.karrieretagDaten.datum);
        return `${date.getFullYear()}`;
      }
      return 'N/A';
    },
    nurTeilnehmer() {
      return this.antraege.filter(
        (el) => el.status == 'Teilnehmer' || el.status == 'teilnehmer',
      );
    },
    nurAbgelehnt() {
      return this.antraege.filter(
        (el) => el.status == 'Abgelehnt' || el.status == 'abgelehnt',
      );
    },
    nurOffen() {
      return this.antraege.filter(
        (el) => el.status == 'Anfrage' || el.status == 'anfrage',
      );
    },
    nurDatenErhalten() {
      return this.antraege.filter(
        (el) => el.status == 'Daten erhalten' || el.status == 'daten erhalten',
      );
    },
  },
};
</script>

<style lang="scss">
.v-data-table-header th {
  white-space: nowrap;
  background-color: #eeeeee;
}
</style>
