<template>
  <v-container>
    <div v-if="data.formular">
      <v-row>
        <v-col cols="12" md="1">Ihre URL:</v-col>
        <v-col cols="12" md="11">
          <a
            :href="
              data.url.includes('https://') || data.url.includes('http://')
                ? data.url
                : `http://${data.url}`
            " target="_blank"
          >
            <v-chip disabled color="blue" pill>{{ data.url }}</v-chip>
          </a>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1">
          <v-icon large color="black">
            mdi-account-network
          </v-icon>
        </v-col>
        <v-col cols="11">
          <v-divider class="mx-4"></v-divider>
        </v-col>
      </v-row>

      <v-card-title>Ansprechpartner</v-card-title>

      <v-container class="py-0">
        <v-row class="mt-0">
          <v-col cols="12" lg="4" md="6">
            <v-card-subtitle>
              Teilnahme
            </v-card-subtitle>

            <v-card-text>
              <v-chip-group active-class="red accent-4 white--text" column>
                <v-chip disabled dark>{{
                  data.ansprechpartner_teilnahme_mail
                }}</v-chip>
                <v-chip disabled dark>{{
                  data.ansprechpartner_teilnahme_tel
                }}</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-col>
          <v-col cols="12" lg="8" md="6">
            <v-card-subtitle>
              Ausstellung
            </v-card-subtitle>

            <v-card-text>
              <v-chip-group active-class="red accent-4 white--text" column>
                <v-chip disabled dark>{{
                  data.ansprechpartner_ausstellung_mail
                }}</v-chip>
                <v-chip disabled dark>{{
                  data.ansprechpartner_ausstellung_tel
                }}</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>

      <v-row>
        <v-col cols="1">
          <v-icon large color="black">
            mdi-bag-checked
          </v-icon>
        </v-col>
        <v-col cols="11">
          <v-divider class="mx-4"></v-divider>
        </v-col>
      </v-row>

      <v-card-title>Aufenthalt</v-card-title>

      <v-container class="py-0">
        <v-row class="mt-0">
          <v-col cols="12" sm="4">
            <v-card-subtitle>
              Platz
            </v-card-subtitle>

            <v-card-text>
              <v-chip-group
                v-model="data.platz"
                active-class="red accent-4 white--text"
                column
              >
                <v-chip disabled value="Klasse">Klasse</v-chip>

                <v-chip disabled value="Gang">Am Gang</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-col>
          <v-col cols="12" sm="8">
            <v-card-subtitle>
              Aufbauhilfe
            </v-card-subtitle>

            <v-card-text>
              <v-chip-group
                v-model="data.aufbauhilfe"
                active-class="red accent-4 white--text"
                column
              >
                <v-chip disabled :value="true">Ja</v-chip>

                <v-chip disabled :value="false">Nein</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
      <v-row>
        <v-col cols="1">
          <v-icon large color="black">
            mdi-call-split
          </v-icon>
        </v-col>
        <v-col cols="11">
          <v-divider class="mx-4"></v-divider>
        </v-col>
      </v-row>
      <v-card-title>Fachrichtung</v-card-title>

      <v-container class="py-0">
        <v-row class="mt-0">
          <v-col cols="12">
            <v-card-subtitle>
              Ihr Unternehmen ist in folgenden Bereichen tätig
            </v-card-subtitle>

            <v-card-text>
              <v-chip-group
                v-model="FachrichtungYesNo"
                active-class="red accent-4 white--text"
                column
              >
                <v-chip disabled :value="data.fachrichtung.includes('IT')"
                  >Informationstechnologie</v-chip
                >

                <v-chip disabled :value="data.fachrichtung.includes('E')"
                  >Elektrotechnik/Elektronik</v-chip
                >
                <v-chip
                  disabled
                  :value="data.fachrichtung.includes('Maschinenbau')"
                  >Maschinenbau</v-chip
                >
              </v-chip-group>
            </v-card-text>
          </v-col>
          <v-divider class="mx-4"></v-divider>

          <v-col cols="12">
            <v-card-subtitle>
              Möchten Sie einen Vortrag halten?
            </v-card-subtitle>
            <v-card-text>
              <v-chip-group
                v-model="VortragYesNo"
                active-class="red accent-4 white--text"
                column
              >
                <v-chip disabled :value="true">Ja</v-chip>

                <v-chip disabled :value="false">Nein</v-chip>
              </v-chip-group>
            </v-card-text>
            <div v-if="VortragYesNo">
              <v-card-subtitle>
                Mit anwesenden Schüler/innen aus der
              </v-card-subtitle>
              <v-card-text>
                <v-chip-group
                  v-model="VortragYesNo"
                  active-class="red accent-4 white--text"
                  column
                >
                  <v-chip disabled :value="data.vortrag_auswahl.includes('IT')"
                    >Informationstechnologie</v-chip
                  >

                  <v-chip
                    disabled
                    :value="data.vortrag_auswahl.includes('E/ET')"
                    >Elektrotechnik/Elektronik</v-chip
                  >
                  <v-chip
                    disabled
                    :value="data.vortrag_auswahl.includes('Maschinenbau')"
                    >Maschinenbau</v-chip
                  >
                </v-chip-group>
              </v-card-text>
            </div>
          </v-col>
          <v-divider class="mx-4"></v-divider>

          <v-col cols="12">
            <v-card-subtitle>
              Ihre Firma bietet auch Ferialpraxisplätze an?
            </v-card-subtitle>
            <v-card-text>
              <v-chip-group
                v-model="FerialYesNo"
                active-class="red accent-4 white--text"
                column
              >
                <v-chip disabled :value="true">Ja</v-chip>

                <v-chip disabled :value="false">Nein</v-chip>
              </v-chip-group>
            </v-card-text>

            <div v-if="FerialYesNo == true">
              <v-card-subtitle>
                In folgenden Bereichen
              </v-card-subtitle>
              <v-card-text>
                <v-chip-group
                  v-model="FerialYesNo"
                  active-class="red accent-4 white--text"
                  column
                >
                  <v-chip
                    disabled
                    :value="data.ferialpraktikum_auswahl.includes('IT')"
                    >Informationstechnologie</v-chip
                  >

                  <v-chip
                    disabled
                    :value="data.ferialpraktikum_auswahl.includes('E')"
                    >Elektrotechnik/Elektronik</v-chip
                  >
                  <v-chip
                    disabled
                    :value="
                      data.ferialpraktikum_auswahl.includes('Maschinenbau')
                    "
                    >Maschinenbau</v-chip
                  >
                </v-chip-group>
              </v-card-text>
            </div>
            <div v-if="FerialYesNo == true">
              <v-card-subtitle>
                Ansprechpartner/in für Ferialpraxis
              </v-card-subtitle>
              <v-card-text>
                <v-chip-group active-class="red accent-4 white--text" column>
                  <v-chip disabled dark>{{ data.mail_ferialpraktikum }}</v-chip>
                  <v-chip disabled dark>{{ data.tel_ferialpraktikum }}</v-chip>
                </v-chip-group>
              </v-card-text>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-row>
        <v-col cols="1">
          <v-icon large color="black">
            mdi-finance
          </v-icon>
        </v-col>
        <v-col cols="11">
          <v-divider class="mx-4"></v-divider>
        </v-col>
      </v-row>
      <v-card-title>Finanzielle</v-card-title>

      <v-container class="py-0">
        <v-row class="mt-0">
          <v-col cols="12" md="6">
            <v-card-subtitle>
              Wir sind an einem Sponsoring/einer Partnerschaft interessiert
            </v-card-subtitle>
            <v-card-text>
              <v-chip-group
                v-model="data.sponsoring_interessiert"
                active-class="red accent-4 white--text"
                column
              >
                <v-chip disabled :value="true">Ja</v-chip>

                <v-chip disabled :value="false">Nein</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-subtitle>
              Die exakte Rechnungsanschrift (bei Änderung bitte um Mitteilung!)
            </v-card-subtitle>
            <v-card-text>
              <v-chip-group active-class="red accent-4 white--text" column>
                <v-chip disabled>{{ data.rechnungsadresse }}</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else style="height: 80vh; " class="center text-center">
      <v-banner two-lines align="center" outlined>
        <v-icon slot="icon" color="red darken-4" size="36">
          mdi-wifi-strength-alert-outline
        </v-icon>
        Daten noch nicht vorhanden. Bitte Anmeldeformular ausfüllen

        <template v-slot:actions>
          <v-btn
            color="red darken-4"
            text
            to="/anmeldeformular"
            class="mx-auto mb-2"
          >
            Zum Formular
          </v-btn>
        </template>
      </v-banner>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  methods: {
    getUser() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user != null) {
        this.user = user.user;
        this.setParams();
      } else localStorage.removeItem('user');
    },
    setParams() {
      if (this.data.vortrag_auswahl != null && this.data.vortrag_auswahl != '')
        this.VortragYesNo = true;
      else this.VortragYesNo = false;

      if (
        this.data.ferialpraktikum_auswahl != null &&
        this.data.ferialpraktikum_auswahl != ''
      )
        this.FerialYesNo = true;
      else this.FerialYesNo = false;
      if (this.data.fachrichtung != null && this.data.fachrichtung != '')
        this.FachrichtungYesNo = true;
      else this.FachrichtungYesNo = false;
    },
    async getFirma() {
      const { data } = await axios({
        url: '/firma/' + this.user.firmen_id,
        method: 'GET',
      });
      data;
      this.data = data;
    },
  },
  async created() {
    this.getUser();
    await this.getFirma();
    this.setParams();
  },
  data() {
    return {
      FerialYesNo: '',
      VortragYesNo: '',
      FachrichtungYesNo: '',
      user: {},
      data: {},
      show: false,
      formular_from_database: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
