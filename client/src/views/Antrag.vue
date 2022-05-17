<template>
  <v-container>
    <v-form class="mt-2 py-5" ref="form" v-model="valid" lazy-validation>
      <header class="text-center py-4 ">
        <h2 class="text-center text-uppercase font-weight-light ">
          Interesse an dem Karrieretag teilzunehmen?
        </h2>
        <h5 class="text-center text-uppercase font-weight-light grey--text ">
          Dann füllen Sie das folgende Formular aus.
        </h5>
      </header>
      <v-row>
        <v-col cols="12">
          <v-text-field
            color="red"
            v-model.trim="company"
            :rules="companyRules"
            id="company"
            required
            clearable
            background-color="blue-grey lighten-5"
            label="Company Name"
            solo
            :error-messages="
              showCompanyMessage ? ['Company name already in use'] : ''
            "
            prepend-inner-icon="mdi-domain"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            class="black--text"
            color="red"
            :rules="nameRules"
            clearable
            required
            label="First Name"
            background-color="blue-grey lighten-5"
            v-model.trim="firstname"
            solo
            prepend-inner-icon="mdi-account"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            color="red"
            v-model.trim="lastname"
            :rules="nameRules"
            clearable
            required
            label="Last Name"
            class="text-green"
            background-color="blue-grey lighten-5"
            solo
            prepend-inner-icon="mdi-account"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            :rules="emailRules"
            label="E-mail"
            clearable
            required
            color="red"
            background-color="blue-grey lighten-5"
            v-model.trim="email"
            solo
            :error-messages="
              emailNotExisting ? ['Email address not found'] : ''
            "
            prepend-inner-icon="mdi-email"
          ></v-text-field>
        </v-col>
        <v-col cols="4" md="2">
          <v-select
            v-model="selectedPrefix"
            :items="prefixe.map((el) => el.name)"
            menu-props="auto"
            label="Prefix"
            hide-details
            background-color="red darken-4"
            dark
            rounded
            solo
            single-line
          ></v-select>
        </v-col>
        <v-col cols="8" md="10">
          <v-text-field
            :rules="phoneRules"
            required
            :prefix="
              selectedPrefix
                ? prefixe.find((el) => el.name == selectedPrefix).code
                : '+43'
            "
            hide-spin-buttons
            color="red"
            type="number"
            v-model.trim="phone"
            id="phone"
            background-color="blue-grey lighten-5"
            label="Phone Number"
            solo
            :error-messages="
              showPhoneMessage ? ['phone number already in use'] : ''
            "
            prepend-inner-icon="mdi-phone"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class=" py-0">
          <v-checkbox
            v-model="checkbox"
            required="required"
            :rules="checkRules"
            color="red darken-4"
          >
            <template v-slot:label>
              <div>
                Ich habe die
                <span class="red--text" @click="goToImpressum('datenschutz')"
                  ><u>Datenschutzerklärung</u></span
                >
                gelesen und nehme sie zur Kenntnis.
              </div>
            </template>
          </v-checkbox>
        </v-col>
      </v-row>

      <div
        class="g-recaptcha mt-5"
        :data-sitekey="dataSitekey"
        data-callback="verifyCaptcha"
      ></div>
      <span class="caption red--text font-weight-light">{{
        recaptcha_message
      }}</span>
      <v-container class=" my-0 py-0" text-center justify-center>
        <h5 class="text--secondary mb-3">
          <a @click="goToImpressum('datenschutz')">Datenschutz</a>
        </h5>
        <v-btn
          rounded
          class="ma-5 pa-6 red darken-4 white--text"
          @click="validate"
          >Formular senden</v-btn
        >
      </v-container>
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      Antrag erfolgreich eingereicht!

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog persistent v-model="loaded" width="150">
      <v-progress-linear
        color="red darken-4"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
import { prefixe } from '../../prefix.js';
export default {
  created() {
    this.verifyCaptcha;
    this.prefixe = prefixe;
  },
  props: {
    antraege: {
      type: Array,
    },
  },
  data: () => ({
    selectedPrefix: 'Austria',
    prefixe: [],
    recaptcha_response: '',
    recaptcha_message: '',
    snackbar: false,
    dataSitekey: process.env.VUE_APP_DATA_SITEKEY,
    checkbox: false,
    timeout: 5000,
    valid: false,
    firstname: '',
    lastname: '',
    phone: '',
    loaded: false,
    emailNotExisting: false,
    showCompanyMessage: false,
    showPhoneMessage: false,
    newDate: new Date(),
    company: '',
    emailMessage: '',
    companyRules: [(v) => !!v || 'Company name is required'],
    checkRules: [(v) => !!v || 'You have to agree!'],
    nameRules: [(v) => !!v || 'Name is required'],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    phoneRules: [
      (v) => !!v || 'Phone number is required',
      (v) =>
        (v > 0 && v.toString().length >= 6 && v.toString().length <= 15) ||
        'Phone number must be valid',
    ],
  }),
  methods: {
    verifyCaptcha(token) {
      this.recaptcha_response = token;
    },
    checkCompanyNameAndPhone() {
      this.checkCompanyName
        ? (this.showCompanyMessage = true)
        : (this.showCompanyMessage = false);
      this.checkPhone
        ? (this.showPhoneMessage = true)
        : (this.showPhoneMessage = false);
    },
    async validate() {
      if (this.recaptcha_response == 0) {
        this.recaptcha_message = 'This field is required.';
      } else this.recaptcha_message = '';
      this.checkCompanyNameAndPhone();
      if (
        this.$refs.form.validate() &&
        this.recaptcha_response != 0 &&
        !this.checkCompanyName &&
        !this.checkPhone
      ) {
        this.recaptcha_message = '';
        this.loaded = true;

        const { data } = await axios({
          url: '/antrag',
          method: 'POST',
          contentType: 'application/json',
          data: {
            firmen_name: this.company,
            firmen_mail: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            phone: this.getCodeofCountry + this.phone,
            zeitpunkt: new Date(),
          },
        });
        this.loaded = false;

        if (data.message != 'OK') {
          this.emailNotExisting = true;
        } else {
          this.$emit('sendmail', {
            firmen_name: this.company,
            email: this.email,
            type: 'antrag',
          });
          this.emailNotExisting = false;

          this.snackbar = true;
          this.$refs.form.reset();
        }
      }
    },
    goToImpressum(id) {
      this.$emit('focusId', id);
    },
  },
  computed: {
    getCodeofCountry() {
      if (this.selectedPrefix) {
        return this.prefixe
          .find((el) => el.name == this.selectedPrefix)
          .code.toString();
      }
      return '+43';
    },
    checkCompanyName() {
      return this.antraege
        .map((el) => el.firmen_name.toLowerCase())
        .find((el) => el == this.company.toLowerCase())
        ? true
        : false;
    },
    checkPhone() {
      return this.antraege
        .map((el) => el.telefonnummer)
        .find((el) => el == this.getCodeofCountry + this.phone)
        ? true
        : false;
    },
  },
  components: {},
  mounted() {
    let recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute(
      'src',
      'https://www.google.com/recaptcha/api.js',
    );
    document.head.appendChild(recaptchaScript);
    window.verifyCaptcha = this.verifyCaptcha;
  },
};
</script>

<style lang="scss" scoped></style>
