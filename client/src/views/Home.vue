<template>
  <v-container fluid>
    <div v-if="!user.admin && user.user != null">
      <v-banner class="mb-2" v-if="user.checkformular || user.user.formular">
        <v-avatar slot="icon" color="green" size="40">
          <v-icon icon="mdi-sticker-check" color="white">
            mdi-sticker-check
          </v-icon>
        </v-avatar>

        Teilnahmeprozess abgeschlossen.
      </v-banner>
      <v-banner class="mb-2" v-else>
        <v-avatar slot="icon" color="black" size="40">
          <v-icon icon="mdi-tag" color="white">
            mdi-tag
          </v-icon>
        </v-avatar>

        Bitte füllen Sie das
        <router-link to="/anmeldeformular" class="red--text text--darken-4"
          >Anmeldeformular</router-link
        >
        aus, um den Teilnahmeprozess abzuschließen.
      </v-banner>
    </div>

    <v-container fluid class="black--text mt-10 " text-center>
      <!-- <h1 class="display-1 font-weight-light text-uppercase ">
        BIS ZUM KARRIERETAG <b>2022</b> der
        <span class="red--text text--darken-4 font-weight-bold">
          HTL Wien West
        </span>
      </h1> -->
      <h1 class="display-1 font-weight-light text-uppercase ">
        KARRIERETAG der
        <span class="red--text text--darken-4 font-weight-bold">
          HTL Wien West
        </span>
        IN
      </h1>
      <v-row class="display-1" style="font-size: 100px"
        ><Countdown
          id="countdown"
          deadline="2022-08-21"
          class="p-0 m-0"
        ></Countdown
      ></v-row>
    </v-container>
    <v-container justify-center text-center>
      <v-row>
        <v-col v-if="!user.admin && user.user != null">
          <v-btn
            class="mx-2"
            fab
            dark
            x-large
            color="red darken-4"
            to="/anmeldeformular"
            name="Informationen"
            alt="Informationen"
            title="Informationen"
          >
            <v-icon dark>
              mdi-note-text
            </v-icon>
          </v-btn>
          <p class=" mt-4" style="font-size:20px">Anmeldeformular</p>
        </v-col>
        <v-col>
          <v-btn
            class="mx-2"
            fab
            dark
            x-large
            color="black"
            to="/infos"
            name="Informationen"
            alt="Informationen"
            title="Informationen"
          >
            <v-icon dark>
              mdi-information
            </v-icon>
          </v-btn>
          <p class=" mt-4" style="font-size:20px">Informationen</p>
        </v-col>
        <v-col v-if="user.user == null">
          <v-btn
            class="mx-2"
            fab
            dark
            x-large
            color="red darken-4"
            to="/antrag"
            name="Formular ausfüllen"
            alt="Formular"
            title="Formular ausfüllen"
          >
            <v-icon dark>
              mdi-android-messages
            </v-icon>
          </v-btn>
          <p class=" mt-4" style="font-size:20px">Formular</p>
        </v-col>
        <v-col v-if="user.user == null">
          <v-btn
            class="mx-2"
            fab
            dark
            x-large
            color="black"
            to="/login"
            name="Login"
            alt="Login"
            title="Login"
          >
            <v-icon dark>
              mdi-login
            </v-icon>
          </v-btn>
          <p class="mt-4" style="font-size:20px">Anmelden</p>
        </v-col>
      </v-row>
    </v-container>

    <v-container class=" mt-10" id="arrowFirst">
      <v-row class="mb-16 pb-5">
        <v-col cols="12" md="6" class="pr-10">
          <div>
            <p style="font-size:26px">
              Karrieretag
            </p>
            <p>
              Die HTL Wien West veranstaltet einmal im Jahr einen Karrieretag
              für die Schülerinnen und Schüler der Ausbildungsrichtungen
              Elektrotechnik, Elektronik, Informationstechnologie, Maschinenbau
              und Mechatronik.
            </p>
          </div>
          <div class="my-10">
            <v-btn
              x-large
              color="red darken-4"
              dark
              @click="tellParentChangeColor('karrieretag')"
              name="Mehr über den Karrieretag"
              title="Mehr über den Karrieretag"
            >
              More
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-carousel
            hide-delimiters
            next-icon
            prev-icon
            cycle
            interval="4000"
            height="350"
          >
            <v-carousel-item
              v-for="i of c1"
              :key="i.id"
              :src="i.image"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-divider dark class="hidden-lg-and-up"></v-divider>
      <v-row class="my-16 py-16">
        <v-col cols="12" md="6">
          <v-carousel
            hide-delimiters
            next-icon
            prev-icon
            cycle
            interval="4000"
            height="350"
          >
            <v-carousel-item
              v-for="i of c2"
              :key="i.id"
              :src="i.image"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="12" md="6">
          <div class="mb-10">
            <p style="font-size:26px">
              Über uns
            </p>
            <p>
              Um die Schülerinnen und Schüler für die Herausforderungen unserer
              Zeit gut vorzubereiten, widmet sich die HTL Wien West in allen
              ihren technischen Ausbildungsrichtungen noch stärker als bisher
              den Themen Digitalisierung und Umwelt.
            </p>
          </div>
          <div>
            <v-btn
              x-large
              color="red darken-4"
              dark
              @click="tellParentChangeColor('ueberuns')"
              name="Mehr über uns"
              title="Mehr über uns"
            >
              More
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-divider dark class="hidden-md-and-up"></v-divider>

      <v-row class="my-16 pb-5">
        <v-col cols="12" md="6" class="pr-10">
          <div>
            <p style="font-size:26px">
              Rückblick 2022
            </p>
            <p>
              60 Unternehmen/Ausbildungseinrichtungen nutzten die Gelegenheit
              und kamen an unsere Schule, um sich zu präsentieren. Das ist neuer
              Rekord!
            </p>
          </div>
          <div class="my-10">
            <v-btn
              x-large
              color="red darken-4"
              dark
              @click="tellParentChangeColor('rekord')"
              name="Mehr über Rekord"
              title="Mehr über Rekord"
            >
              More
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-carousel
            hide-delimiters
            next-icon
            prev-icon
            cycle
            interval="4000"
            height="350"
          >
            <v-carousel-item
              v-for="i of c3"
              :key="i.id"
              :src="i.image"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Countdown from 'vuejs-countdown';
import axios from 'axios';

export default {
  props: {
    changeColor: {
      type: Function,
    },
  },
  created() {
    this.getUser();
    this.getKarrieretagDaten();
  },
  mounted() {
    // document.querySelector('#countdown').__vue__.end= '2022-05-22'
  },
  data: () => ({
    countdown: null,
    karrieretagDaten: [],
    c1: [
      {
        image: 'images/KT2020-0.jpg',
        id: 1,
      },
      {
        image: 'images/KT2020-1.jpg',
        id: 2,
      },
      {
        image: 'images/KT2020-2.jpg',
        id: 3,
      },
      {
        image: 'images/KT2020-3.jpg',
        id: 4,
      },
    ],
    c2: [
      {
        image: 'images/KT2020-4.jpg',
        id: 5,
      },
      {
        image: 'images/KT2020-5.jpg',
        id: 6,
      },
      {
        image: 'images/KT2020-6.jpg',
        id: 7,
      },
      {
        image: 'images/KT2020-7.jpg',
        id: 8,
      },
    ],
    c3: [
      {
        image: 'images/KT2020-8.jpg',
        id: 9,
      },
      {
        image: 'images/KT2020-9.jpg',
        id: 10,
      },
      {
        image: 'images/KT2020-10.jpg',
        id: 11,
      },
      {
        image: 'images/KT2020-11.jpg',
        id: 12,
      },
    ],
    user: {},
  }),
  methods: {
    tellParentChangeColor(id) {
      this.$emit('changeColor', id);
    },
    getUser() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user != null) {
        this.user = user;
      }
    },
    async getKarrieretagDaten() {
      const { data } = await axios({
        url: '/karrieretagdata',
        method: 'get',
      });
      this.karrieretagDaten = data;
    },
  },

  components: { Countdown },
};
</script>

<style>
.row {
  margin-top: 3%;
  margin-bottom: 3%;
}

/* .masthead {
  height: 60vh;
  min-height: 500px;
  background-image: url('../assets/HTL.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
} */
/* .blackContainer {
  background: rgba(0, 0, 0, 0.555);
} */
</style>
