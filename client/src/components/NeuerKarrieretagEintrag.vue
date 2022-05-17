<template>
  <v-container>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="blue-grey darken-2 white--text ">
          <span class="text-h5">Neuer Karrieretag Eintrag</span>
        </v-card-title>

        <v-card-text>
          <v-container class="d-flex justify-content-center">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Nächster Karrieretag"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                :active-picker.sync="activePicker"
                :min="
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)
                "
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-container>
          <div class="my-3 text-center">
            <v-btn
              color="error"
              class="ma-2 white--text "
              @click="dialogDatenLöschen = true"
            >
              <v-icon left dark>
                mdi-delete-forever
              </v-icon>
              Daten löschen
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-4" text @click="$emit('closeDialog')">
            Abbrechen
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="updateKarrieretag"
            :disabled="date == null"
          >
            Speichern
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDatenLöschen" persistent max-width="600px">
      <v-card class="text-center pa-5 ">
        <v-card-title class="justify-content-center">
          <span class="text-h5">Daten löschen?</span>
        </v-card-title>
        <v-card-subtitle class="my-2">
          Sind Sie sicher, dass Sie die Daten löschen möchten? Sie können diese
          Aktion nicht rückgängig machen!
        </v-card-subtitle>
        <v-card-text>
          <v-alert
            text
            prominent
            type="error"
            icon="mdi-cloud-alert"
            class="mb-5"
          >
            Bitte beachten Sie, dass die Daten unwiderruflich von der Datenbank
            gelöscht werden.
          </v-alert>
          <p>Geben Sie "delete data", um zu bestätigen</p>
          <v-text-field
            outlined
            class="centered-input"
            dense
            v-model="confirm"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-content-center">
          <v-btn
            color="indigo darken-3"
            dark
            class="mr-5"
            outlined
            @click="dialogDatenLöschen = false"
          >
            Abbrechen
          </v-btn>
          <v-btn
            color="red darken-3"
            class="ml-5 white--text"
            :disabled="confirm != 'delete data'"
            :loading="loading"
            @click="deleteDataFromDatabase()"
          >
            Daten löschen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar color="green darken-3" dark v-model="snackbar" :timeout="5000">
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    dialog: {
      type: Boolean,
    },
  },
  data() {
    return {
      loading: false,
      activePicker: null,
      date: null,
      menu: false,
      dialogDatenLöschen: false,
      confirm: '',
      message: '',
      snackbar: false,
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'));
    },
  },

  methods: {
    async updateKarrieretag() {
      const { data } = await axios({
        url: '/karrieretag',
        method: 'PATCH',
        contentType: 'application/json',
        data: {
          datum: this.date,
        },
      });
      this.message = `Neuer Karrieretag: ${data[0].datum}`;
      this.snackbar = true;
      this.$emit('closeDialog');
    },
    async deleteDataFromDatabase() {
      const { data } = await axios({
        url: '/firmen',
        method: 'DELETE',
      });
      console.log(data);
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>
