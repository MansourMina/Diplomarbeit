<template>
  <!-- eslint-disable -->

  <v-container
    style="padding: 10px 80px 0px 80px;  position: relative"
    class="'pa-md-16 font-weight-black"
  >
    <v-row class="mb-0 pb-0">
      <v-col cols="12" style="text-align-last: end;">
        <v-row>
          <v-col
            cols="12"
            sm="4"
            md="8"
            style="display:flex;justify-content:flex-end"
          >
            <span class="mb-10 mr-4" style="margin-right: 8px">Direktion</span>
            <v-divider vertical dark class="ml-2"></v-divider>
          </v-col>

          <v-col cols="12" sm="8" md="4">
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
        </v-row>
      </v-col>
    </v-row>
    <div>
      <!-- Max Mustermann GmbH<br />
      zH. Max Mustermann <br />
      Lasallestraße 24, Wien 1020 <br />
      mansour.m02@gmail.com -->
      {{ firma.firmen_name }}<br />
      zH. {{ firma.vorname }} {{ firma.nachname }} <br />
      {{ firma.rechnungsadresse }}<br />
      {{ firma.firmen_mail }}<br />
    </div>
    <br /><br />
    <div style="margin-right: 20px">
      <div style="text-align-last: end;">
        <h6>
          <span style="margin-left: 10px ">
            <b>Wien, {{ getDatum }}</b></span
          >
        </h6>
      </div>
    </div>
    <div>
      <span class="text-decoration-underline"
        >Rechnung laufende Nr.{{ antraege.indexOf(firma) + 1 }}/Jahr 2022</span
      ><br /><br />
      Hiermit erlauben wir uns, Ihnen für den Karrieretag folgenden Betrag in
      Rechnung zu stellen:<br /><br />
      <b>€ 320,00</b><br /><br />

      Zahlungsziel: <br />
      14 tage<br /><br />

      Kontodaten: <br />
      IBAN: AT811100000345702500 <br />
      BIC: BKAUATWW <br />
      Verein zur Förderung der Höheren Technischen <br />
      Bundeslehranstalt Wien 16 <br /><br /><br />
    </div>
    <div style="text-align:center; margin-top: 20px">
      Mit freundlichen Grüßen
      <br /><br /><br /><br />
      Mag. Thomas Angerer<br />Schulleiter & Vorsitzender
    </div>
    <br /><br />
    <br />

    <div style="text-align-last: end; margin-right: 20px">
      <div style="margin-left: 10px; font-size: 13px ">
        <b>Höhere Technische Bundeslehranstalt Wien West </b><br />
        <span class="text--secondary" style="font-weight:normal">
          Thaliastraße 125 - Hettenkofergasse 15 - Tel.: 49 111/113, Fax: 49
          111/199<br />
          E-Mail: direktion@htlwienwest.at - Homepage: www.htlwienwest.at
        </span>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    firma: {
      type: Object,
    },
    antraege: {
      type: Array,
    },
  },
  computed: {
    getDatum() {
      const months = [
        'Jänner',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Juli',
        'November',
        'Dezember',
      ];
      return `${new Date().getDate()}. ${
        months[new Date().getMonth()]
      } ${new Date().getFullYear()}`;
    },
  },
};
</script>
