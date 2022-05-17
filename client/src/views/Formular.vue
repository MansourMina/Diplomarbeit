<template>
  <div>
    <v-container
      v-if="
        user.checkformular ||
          checkformular ||
          user.user.formular ||
          user.user.status == 'Teilnehmer'
      "
      fill-height
      class="pa-16 centerBanner"
      style="height: 80vh"
    >
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-alert border="top" colored-border type="success" elevation="2">
            Sehr geehrte <b>{{ user.user.firmen_name }}</b
            >, <br /><br />Ihre <b>Anmeldung</b> wurde <b>bestätigt</b>. Sie
            werden in Kürze die weiteren <b>Informationen</b> bezüglich des
            <b>Karrieretags</b> sowie Ihrem <b>Aufenthaltsort</b> in der Schule
            erhalten.<br />
            Schauen Sie bitte regelmäßig im <b>Spam-Ordner</b> nach, falls Sie
            keine <b>E-Mail</b> erhalten haben. <br /><br />
            Vielen Dank für Ihre Zeit.<br /><br />
            Mit freundlichen Grüßen <br />
            Ihr Karrieretag Team
            <br /><br />
            Jetzt Daten anschauen
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <p class="display-1">
        Anmeldeformular <v-icon large class="ml-2">mdi-form-select</v-icon>
      </p>
      <p class="subtitle-2">
        Bitte füllen Sie folgendes Formular aus. Die Anmeldung wird danach
        bestätigt.
      </p>
      <v-divider></v-divider>
      <p>
        Hiermit melden wir uns verbindlich zum
        <b>HTL Wien West Karrieretag</b> an, welcher am
        <b>Donnerstag den 21.04.2022</b> stattfinden wird. <br />Für die
        Teilnahme wird eine Aufwandspauschale von <b>290€</b> berechnet.
      </p>
      <v-form ref="form" v-model="valid">
        <v-row class="mt-3">
          <v-col cols="12" md="5"
            ><span class="font-weight-bold">Name des Ausstellers</span> (so wird
            er auf der Homepage erscheinen):</v-col
          >
          <v-col cols="12" md="7">
            <v-text-field
              label="Name"
              v-model.trim="aussteller_homepage"
              solo
              dense
              hint="Max Mustermann GmbH"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col cols="12" md="4"
            ><span class="font-weight-bold"
              >Gewünschte URL für Verlinkung:</span
            ></v-col
          >
          <v-col cols="12" md="8">
            <v-text-field
              label="URL"
              type="url"
              solo
              v-model.trim="url"
              hint="www.example.com"
              :rules="requiredRule"
              dense
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-subheader class="pa-0 mt-2"
          >Ansprechpartner/in
          <v-icon class="ml-2">mdi-account-network</v-icon></v-subheader
        >
        <v-divider class="pt-0 mt-0"></v-divider>

        <v-row class="mt-3">
          <v-col cols="12" md="3"
            ><span class="font-weight-bold"
              >Ansprechpartner/in für Teilnahme:</span
            ></v-col
          >
          <v-col cols="12" md="4">
            <v-text-field
              label="Tel."
              type="number"
              ref="telTeilnahme"
              :error-messages="
                phoneTeilnahme ? ['Phone number already in use'] : ''
              "
              :rules="phoneRules"
              solo
              dense
              v-model.trim="telteilnehmer"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field
              label="Email"
              solo
              dense
              v-model.trim="mailteilnehmer"
              :rules="mailRules"
              :error-messages="
                emailNotExisting ? ['Email address not found'] : ''
              "
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col cols="12" md="3"
            ><span class="font-weight-bold"
              >Ansprechpartner/in für Ausstellung:</span
            ></v-col
          >
          <v-col cols="12" md="4">
            <v-text-field
              label="Tel."
              type="number"
              ref="telAusstellung"
              :error-messages="
                phoneAusstellung ? ['Phone number already in use'] : ''
              "
              solo
              :rules="phoneRules"
              dense
              v-model.trim="telaussteller"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field
              label="Email"
              solo
              dense
              v-model.trim="mailaussteller"
              :rules="mailRules"
              :error-messages="
                emailNotExisting ? ['Email address not found'] : ''
              "
            ></v-text-field>
          </v-col>
        </v-row>
        <v-subheader class="pa-0 mt-2"
          >Ihr Platz
          <v-icon class="ml-2">mdi-chair-rolling</v-icon></v-subheader
        >
        <v-divider class="pt-0 mt-0"></v-divider>
        <v-row class="mt-2">
          <v-col cols="12" md="12"
            ><span class="font-weight-bold">Gewünschter Standplatz</span>
            (Vergabe nach Verfügbarkeit und Anmeldungsreihenfolge):</v-col
          >
          <v-radio-group v-model="standplatz" row mandatory>
            <v-radio label="In einer Klasse" value="Klasse"></v-radio>
            <v-radio label="Am Gang" value="Gang"></v-radio>
          </v-radio-group>
        </v-row>

        <v-subheader class="pa-0 mt-8"
          >Aufbauhilfe
          <v-icon class="ml-2">mdi-bag-suitcase</v-icon></v-subheader
        >
        <v-divider class="pt-0 mt-0"></v-divider>
        <v-row class="mt-2">
          <v-col cols="12" md="12"
            ><span class="font-weight-bold"
              >Brauchen Sie Hilfe beim Aufbau Ihrer Sachen?</span
            ></v-col
          >
          <v-radio-group v-model="aufbauhilfe" row mandatory>
            <v-radio label="Ja" value.bool="true"></v-radio>
            <v-radio label="Nein" value.bool="false"></v-radio>
          </v-radio-group>
        </v-row>
        <v-subheader class="pa-0 mt-8"
          >Fachrichtung <v-icon class="ml-2">mdi-sitemap</v-icon></v-subheader
        >
        <v-divider class="pt-0 mt-0"></v-divider>
        <v-row class="mt-2">
          <v-col cols="12" md="12"
            ><span class="font-weight-bold"
              >Ihr Unternehmen ist in folgenden Bereichen tätig:</span
            ></v-col
          >
          <v-col cols="12" md="3" class="py-0"
            ><v-checkbox
              v-model="fachrichtungAuswahl"
              label="Informationstechnologie"
              value="IT"
              required
            ></v-checkbox
          ></v-col>
          <v-col cols="12" md="3" class="py-0"
            ><v-checkbox
              v-model="fachrichtungAuswahl"
              label="Elektrotechnik/Elektronik"
              value="E/ET"
              required
            ></v-checkbox
          ></v-col>
          <v-col cols="12" md="3" class="py-0"
            ><v-checkbox
              v-model="fachrichtungAuswahl"
              label="Maschinenbau"
              value="Maschinenbau"
              required
            ></v-checkbox
          ></v-col>
        </v-row>
        <v-subheader class="pa-0 mt-8"
          >Vorträge <v-icon class="ml-2">mdi-presentation</v-icon></v-subheader
        >
        <v-divider class="pt-0 mt-0"></v-divider>
        <v-row class="mt-2">
          <v-col cols="12" md="12"
            ><span><b>Interesse einen Vortrag zu halten?</b> (optional)</span>
            (Mit anwesenden Schüler/innen aus der):</v-col
          >
          <v-col cols="12" md="3" class="py-0"
            ><v-checkbox
              v-model="vortragauswahl"
              label="Informationstechnologie"
              value="IT"
            ></v-checkbox
          ></v-col>
          <v-col cols="12" md="3" class="py-0"
            ><v-checkbox
              v-model="vortragauswahl"
              label="Elektrotechnik/Elektronik"
              value="E/ET"
            ></v-checkbox
          ></v-col>
          <v-col cols="12" md="3" class="py-0"
            ><v-checkbox
              v-model="vortragauswahl"
              label="Maschinenbau"
              value="Maschinenbau"
            ></v-checkbox
          ></v-col>
        </v-row>
        <v-subheader class="pa-0 mt-8"
          >Ferialpraktikum
          <v-icon class="ml-2">mdi-handshake</v-icon></v-subheader
        >
        <v-divider class="pt-0 mt-0"></v-divider>
        <v-row class="mt-2">
          <v-col cols="12" md="12"
            ><span>
              <b
                >Ihre Firma bietet auch Ferialpraxisplätze in folgenden
                Bereichen an?</b
              >
              (optional)
            </span></v-col
          >
          <v-col cols="12" md="3" class="py-0"
            ><v-checkbox
              v-model="ferialpraktikumauswahl"
              label="Informationstechnologie"
              value="IT"
            ></v-checkbox
          ></v-col>
          <v-col cols="12" md="3" class="py-0"
            ><v-checkbox
              v-model="ferialpraktikumauswahl"
              label="Elektrotechnik/Elektronik"
              value="E/ET"
            ></v-checkbox
          ></v-col>
          <v-col cols="12" md="3" class="py-0"
            ><v-checkbox
              v-model="ferialpraktikumauswahl"
              label="Maschinenbau"
              value="Maschinenbau"
            ></v-checkbox
          ></v-col>
        </v-row>
        <v-row class="mt-2">
          <v-col cols="12" md="3">Ansprechpartner/in für Ferialpraxis:</v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Tel."
              type="number"
              ref="telPraktikum"
              :error-messages="
                phonePraktikum ? ['Phone number already in use'] : ''
              "
              v-model.trim="telpraktikum"
              solo
              :rules="phoneRules"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field
              label="Email"
              v-model.trim="mailpraktikum"
              solo
              dense
              :rules="mailRules"
              :error-messages="
                emailNotExisting ? ['Email address not found'] : ''
              "
            ></v-text-field>
          </v-col>
        </v-row>
        <v-subheader class="pa-0 mt-2"
          >Finanzielle <v-icon class="ml-2">mdi-wallet</v-icon></v-subheader
        >
        <v-divider class="pt-0 mt-0"></v-divider>
        <v-row class="mt-2">
          <v-col cols="12" md="5"
            ><span class="font-weight-bold"
              >Wir sind an einem Sponsoring/einer Partnerschaft
              interessiert?</span
            ></v-col
          >
          <v-col cols="12" md="2" class="pt-0">
            <v-switch v-model="sponsoring" value.bool="true"></v-switch>
          </v-col>
        </v-row>
        <v-row class="mt-3">
          <v-col cols="12" md="5"
            ><span class="font-weight-bold">Die exakte Rechnungsanschrift</span>
            (bei Änderung bitte um Mitteilung):</v-col
          >
          <v-col cols="12" md="7">
            <v-text-field
              label="Adresse"
              v-model.trim="rechnungsadresse"
              :rules="requiredRule"
              solo
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-3">
          <v-col cols="12" md="12"><b>Kommentar</b> (optional):</v-col>
          <v-col cols="12" md="12">
            <v-textarea solo name="input-7-4" v-model="comment"></v-textarea>
          </v-col>
        </v-row>
        <v-btn class="red darken-4 white--text" @click="updateFormular()"
          >Absenden</v-btn
        >
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          :color="snackbarcolor"
        >
          {{ message }}

          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: {},
      valid: true,
      snackbar: false,
      snackbarcolor: '',
      message: '',
      timeout: 5000,
      checkformular: false,
      aussteller_homepage: '',
      telteilnehmer: '',
      mailteilnehmer: '',
      telaussteller: '',
      mailaussteller: '',
      url: '',
      standplatz: '',
      aufbauhilfe: false,
      vortragauswahl: [],
      ferialpraktikumauswahl: [],
      fachrichtungAuswahl: ['IT', 'E/ET', 'Maschinenbau'],
      telpraktikum: '',
      mailpraktikum: '',
      phoneAusstellung: false,
      phonePraktikum: false,
      phoneTeilnahme: false,
      sponsoring: false,
      rechnungsadresse: '',
      comment: '',
      phoneExists: false,
      emailNotExisting: false,
      alleFirmen: [],
      mailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      requiredRule: [(v) => !!v || 'This field is required.'],
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        (v) =>
          (v > 0 && v.toString().length >= 6 && v.toString().length <= 15) ||
          'Phone number must be valid',
      ],
    };
  },

  created() {
    this.getUser();
    this.getFirmen();
  },
  computed: {
    checkTeilnehmer() {
      return this.alleFirmen.find(
        (el) => el.ansprechpartner_teilnahme_tel == this.telteilnehmer,
      )
        ? true
        : false;
    },
    checkPraktikum() {
      return this.alleFirmen.find(
        (el) => el.tel_ferialpraktikum == this.telpraktikum,
      )
        ? true
        : false;
    },
    checkAusstellung() {
      return this.alleFirmen.find(
        (el) => el.ansprechpartner_ausstellung_tel == this.telaussteller,
      )
        ? true
        : false;
    },
  },
  methods: {
    checkCompanyPhone() {
      this.checkTeilnehmer
        ? ((this.phoneTeilnahme = true), this.$refs.telTeilnahme.focus())
        : (this.phoneTeilnahme = false);
      this.checkPraktikum
        ? ((this.phonePraktikum = true), this.$refs.telPraktikum.focus())
        : (this.phonePraktikum = false);
      this.checkAusstellung
        ? ((this.phoneAusstellung = true), this.$refs.telAusstellung.focus())
        : (this.phoneAusstellung = false);
    },
    getUser() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user != null) {
        this.user = user;
        this.aussteller_homepage = this.user.user.firmen_name;
      }
    },
    async getFirmen() {
      const { data } = await axios({
        url: '/antraege',
        method: 'GET',
      });
      this.alleFirmen = data;
    },

    async updateFormular() {
      this.checkCompanyPhone();
      if (
        this.$refs.form.validate() &&
        !this.checkTeilnehmer &&
        !this.checkPraktikum &&
        !this.checkAusstellung &&
        this.valid
      ) {
        try {
          const { data } = await axios({
            url: '/anmeldeformular/' + this.user.user.firmen_id,
            method: 'PATCH',
            contentType: 'application/json',
            data: {
              fachrichtung: this.fachrichtungAuswahl,
              platz: this.standplatz,
              aufbauhilfe: this.aufbauhilfe,
              rechnungsadresse: this.rechnungsadresse,
              url: this.url.toLowerCase(),
              vortrag_auswahl: this.vortragauswahl,
              ansprechpartner_ausstellung_tel: this.telaussteller,
              ansprechpartner_ausstellung_mail: this.mailaussteller,
              ansprechpartner_teilnahme_tel: this.telteilnehmer,
              ansprechpartner_teilnahme_mail: this.mailteilnehmer,
              ausstellung_wie_homepage: this.aussteller_homepage,
              ferialpraktikum_auswahl: this.ferialpraktikumauswahl,
              sponsoring_interessiert: this.sponsoring,
              firmen_kommentar: this.comment,
              tel_ferialpraktikum: this.telpraktikum,
              mail_ferialpraktikum: this.mailpraktikum,
              formular: true,
              status: 'Teilnehmer',
            },
          });
          if (data.message != 'OK') {
            this.emailNotExisting = true;
          } else {
            this.emailNotExisting = false;
          }
          this.pushHistory();
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
          this.snackbar = true;
          this.snackbarcolor = 'green';
          this.message = 'Anmeldeformular erfolgreich eingereicht!';
          this.checkformular = true;
          this.user.checkformular = true;
          this.$emit('formularDone', this.user.checkformular);
          localStorage.setItem('user', JSON.stringify(this.user));
          await axios({
            url: '/status/' + this.user.user.firmen_id,
            method: 'PATCH',
            contentType: 'application/json',
            data: {
              status: 'Teilnehmer',
            },
          });
          this.$emit('sendmail', {
            firmen_name: this.user.user.firmen_name,
            email: this.user.user.firmen_mail,
            type: 'teilnehmer',
          });
          this.getUser();
        } catch (err) {
          this.snackbar = true;
          this.snackbarcolor = 'red';
          this.message = 'Fehlgeschlagen! Prüfen Sie Ihre Eingaben.';
        }
      }
      this.snackbar = true;
      this.snackbarcolor = 'red';
      this.message = 'Fehlgeschlagen! Prüfen Sie Ihre Eingaben.';
    },
    async pushHistory() {
      await axios({
        url: '/activities',
        method: 'POST',
        contentType: 'application/json',
        data: {
          type: 'Formular',
          time: new Date(),
          firmen_id: this.user.user.firmen_id,
        },
      });
    },
  },
};
</script>

<style scoped>
.centerBanner {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
