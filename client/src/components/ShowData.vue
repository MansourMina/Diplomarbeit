<template>
  <div>
    <v-toolbar dark color="red darken-4" class="fixed-bar">
      <v-btn dark icon text @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>
        {{ user.firmen_name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span>{{ user.anfrage_zeitpunkt.substring(0, 10) }}</span>
    </v-toolbar>

    <v-col cols="12" class="pa-0">
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content class="py-0">
              <v-subheader class="ml-0 pl-0 my-0">
                Name wie Homepage
              </v-subheader>
              <v-list-item-title class="my-0 py-0">{{
                user.ausstellung_wie_homepage
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-3"></v-divider>

          <v-list-item>
            <v-list-item-content class="py-0">
              <v-subheader class="ml-0 pl-0 my-0">
                E-mail
              </v-subheader>
              <v-list-item-title>{{ user.firmen_mail }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-3"></v-divider>

          <v-list-item>
            <v-list-item-content class="py-0">
              <v-subheader class="ml-0 pl-0 my-0">
                URL
              </v-subheader>
              <v-list-item-title
                ><a
                  :href="
                    user.url.includes('https://') ||
                    user.url.includes('http://')
                      ? user.url
                      : `http://${user.url}`
                  "
                  target="_blank"
                  >{{ user.url }}</a
                ></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-3"></v-divider>
          <v-list-item>
            <v-list-item-content class="py-0">
              <v-subheader class="ml-0 pl-0 my-0">
                Fachrichtung/en
              </v-subheader>
              <v-list-item-title>{{
                user.fachrichtung.replaceAll(',', ' - ')
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-3"></v-divider>

          <v-list-item>
            <v-list-item-content class="py-0">
              <v-subheader class="ml-0 pl-0 my-0">
                Platz
              </v-subheader>
              <v-list-item-title> {{ user.platz }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-3"></v-divider>
          <v-list-item>
            <v-list-item-content class="py-0">
              <v-subheader class="ml-0 pl-0 my-0">
                Aufbauhilfe
              </v-subheader>
              <v-list-item-title>
                {{ user.aufbauhilfe ? 'Ja' : 'Nein' }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-3"></v-divider>

          <v-list-group no-action color="red darken-4">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Ansprechpartner Teilnahme</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-icon small class="mr-5 mt-1">mdi-phone</v-icon>

              <v-list-item-content>
                <v-list-item-title>{{
                  user.ansprechpartner_teilnahme_tel
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-icon small class="mr-5 mt-1">mdi-email</v-icon>

              <v-list-item-content>
                <v-list-item-title>{{
                  user.ansprechpartner_teilnahme_mail
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-divider class="my-3"></v-divider>
          <v-list-group no-action color="red darken-4">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Ferialprakikum</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-icon small class="mr-5 mt-1">mdi-sign-direction</v-icon>

              <v-list-item-content>
                <v-list-item-title>{{
                  user.ferialpraktikum_auswahl.replaceAll(',', '-')
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-icon small class="mr-5 mt-1">mdi-phone</v-icon>

              <v-list-item-content>
                <v-list-item-title>{{
                  user.tel_ferialpraktikum
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-icon small class="mr-5 mt-1">mdi-email</v-icon>

              <v-list-item-content>
                <v-list-item-title>{{
                  user.mail_ferialpraktikum
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-divider class="my-3"></v-divider>
          <v-list-group no-action color="red darken-4">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title
                  >Ansprechpartner Austellung</v-list-item-title
                >
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-icon small class="mr-5 mt-1">mdi-phone</v-icon>

              <v-list-item-content>
                <v-list-item-title>{{
                  user.ansprechpartner_ausstellung_tel
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-icon small class="mr-5 mt-1">mdi-email</v-icon>

              <v-list-item-content>
                <v-list-item-title>{{
                  user.ansprechpartner_ausstellung_mail
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-divider class="my-3"></v-divider>
          <v-list-item>
            <v-list-item-content class="py-0">
              <v-subheader class="ml-0 pl-0 my-0">
                Sponsoring
              </v-subheader>
              <v-list-item-title>{{
                user.sponsoring_interessiert ? 'Ja' : 'Nein'
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-3"></v-divider>

          <v-list-item>
            <v-list-item-content class="py-0">
              <v-subheader class="ml-0 pl-0 my-0">
                Rechnungsanschrift
              </v-subheader>
              <v-list-item-title>{{ user.rechnungsadresse }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-3"></v-divider>

          <v-list-group no-action color="red darken-4">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Aktivitäten</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-icon
                small
                class="mr-5 mt-1"
                :color="user.logged_in_first_time ? 'green' : 'red'"
                >mdi-login</v-icon
              >

              <v-list-item-content>
                <v-list-item-title>{{
                  user.logged_in_first_time
                    ? 'Schon mal eingeloggt'
                    : 'Noch nicht eingeloggt'
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-icon
                small
                class="mr-5 mt-1"
                :color="user.formular ? 'green' : 'red'"
                >mdi-form-select</v-icon
              >

              <v-list-item-content>
                <v-list-item-title>{{
                  user.formular
                    ? 'Formular ausgefüllt'
                    : 'Formular nicht ausgefüllt'
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-icon
                small
                class="mr-5 mt-1"
                :color="user.feedback ? 'green' : 'red'"
                >mdi-form-select</v-icon
              >

              <v-list-item-content>
                <v-list-item-title>{{
                  user.feedback ? 'Feedback gegeben' : 'Kein Feedback gegeben'
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-divider class="my-3"></v-divider>

          <v-list-item class="pb-5">
            <v-list-item-action>
              <v-icon>mdi-comment</v-icon>
            </v-list-item-action>

            <v-list-item-content class="py-0">
              <v-subheader class="ml-0 pl-0 my-0">
                Kommentar
              </v-subheader>
              <v-list-item-title>{{ user.firmen_kommentar }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style scoped>
.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 0em;
  z-index: 2;
}
</style>
