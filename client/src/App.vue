<template>
  <v-app>
    <!-- <div class="center" style="height: 100%" v-if="!isloaded">
      <v-progress-circular
        :size="60"
        :width="6"
        color="red darken-4"
        indeterminate
      ></v-progress-circular>
    </div> -->

    <div>
      <div id="progress-bar" class="red darken-4"></div>
      <div class="ma-5" id="up-circle" v-if="showUpButton">
        <v-btn color="red darken-4 " fab large dark @click="toTop()">
          <v-icon>mdi-arrow-up-drop-circle-outline</v-icon>
        </v-btn>
      </div>

      <div v-if="$route.name != 'NotFound'">
        <v-app-bar color="white" app hide-on-scroll height="70">
          <v-app-bar-nav-icon
            @click="drawer = !drawer"
            name="Navbar-Icon"
            title="Navigieren"
          ></v-app-bar-nav-icon>

          <v-toolbar-title>
            <router-link to="/" name="Back to Home "
              ><img
                src="@/assets/logo.jpg"
                class="mt-3 mb-2 hidden-xs-only"
                height="50"
                name="Logo HTL Wien West"
                alt="Logo"
                title="HTL Wien West Logo"
            /></router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn
            text
            class="mr-10"
            active-class="red darken-4 white--text"
            to="/login"
            plain
            v-if="user.user == null"
          >
            Login
          </v-btn>
          <v-btn
            text
            class="mr-10"
            to="/impress"
            active-class="red darken-4 white--text"
            plain
          >
            Impressum
          </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" statless app>
          <v-list nav>
            <v-list-item>
              <v-list-item-content v-if="user.user != null && !user.admin">
                <v-list-item-title class="text-h6">
                  {{ user.user.firmen_name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  user.user.firmen_mail
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content
                v-if="user.user != null && user.admin == true"
              >
                <v-list-item-title class="text-h6">
                  {{ user.user.admin_name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  user.user.admin_email
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content v-if="user.user == null" class="text-center">
                <v-list-item-title class="text-h6">
                  Karrieretag
                </v-list-item-title>
                <v-list-item-subtitle>HTL Wien West 1160 </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <div>
            <v-divider dark></v-divider>
            <v-list dense nav>
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                active-class="red darken-4 white--text"
                :to="item.route"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                link
                active-class="red darken-4 white--text"
                to="/antrag"
                v-if="user.user == null"
              >
                <v-list-item-icon>
                  <v-icon>mdi-newspaper-variant-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Teilnahme Formular</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <div v-if="user.user != null">
            <v-row class="my-0">
              <v-col cols="4">
                <p class="ml-2 mt-1">Extras</p>
              </v-col>
              <v-col cols="8">
                <v-divider dark></v-divider>
              </v-col>
            </v-row>
            <v-list dense nav v-if="user.admin == true">
              <v-list-item
                v-for="item in adminitems"
                :key="item.title"
                link
                active-class="red darken-4 white--text"
                :to="item.route"
                exact
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list dense nav v-else>
              <v-list-item
                link
                active-class="red darken-4 white--text"
                :to="l.route"
                v-for="l of extraItems"
                :key="l.title"
              >
                <v-list-item-icon>
                  <v-icon>{{ l.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ l.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider dark></v-divider>

            <div v-if="user.admin">
              <v-list nav dense>
                <v-list-item
                  dense
                  link
                  active-class="red darken-4 white--text"
                  to="/overview"
                  :disabled="
                    antraege.filter((el) => el.status == 'Teilnehmer').length ==
                      0
                  "
                >
                  <v-list-item-icon>
                    <v-icon>mdi-inbox-full</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Teilnehmer Übersicht</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-list-item
                dense
                link
                exact
                @click="generateReport"
                :disabled="
                  antraege.filter((el) => el.status == 'Teilnehmer').length == 0
                "
              >
                <v-list-item-icon>
                  <v-icon>mdi-chart-timeline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Report erstellen</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item dense link @click="dialogKarrieretagEintrag = true">
                <v-list-item-icon>
                  <v-icon>mdi-autorenew</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Neuen Karrieretag</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
            <v-list-item dense link @click.stop="showDialog = true">
              <v-list-item-icon>
                <v-icon>mdi-account-multiple-remove</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Abmelden</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <AskLogout :showDialog="showDialog" @Askdialog="checkLogout" />
        </v-navigation-drawer>
      </div>

      <v-dialog persistent v-model="dialog" width="150">
        <v-progress-linear
          color="red darken-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-dialog>
      <NeuerKarrieretagEintrag
        :dialog="dialogKarrieretagEintrag"
        @closeDialog="dialogKarrieretagEintrag = false"
      />

      <v-main hide-overlay id="main">
        <router-view
          @changeColor="changeColor"
          @focusId="passId"
          :impressId="impressId"
          :infoId="infoId"
          @refreshAntraege="getAntraege()"
          :antraege="antraege"
          :activities="activities"
          @sendmail="sendmail"
          :karrieretagDaten="karrieretagDaten"
        />
        <Footer />
      </v-main>
    </div>

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
      @beforeDownload="beforeDownload($event)"
    >
      <section slot="pdf-content">
        <PDFContent
          :antraege="antraege"
          :toPdf="true"
          :karrieretagDaten="karrieretagDaten"
        />
      </section>
    </VueHtml2pdf>
  </v-app>
</template>

<script>
import AskLogout from '@/components/AskLogout.vue';
import NeuerKarrieretagEintrag from '@/components/NeuerKarrieretagEintrag.vue';
import PDFContent from '@/components/PDFContent.vue';
import Footer from '@/components/Footer.vue';
import VueHtml2pdf from 'vue-html2pdf';

import axios from 'axios';
export default {
  name: 'App',
  components: {
    AskLogout,
    Footer,
    VueHtml2pdf,
    PDFContent,
    NeuerKarrieretagEintrag,
  },
  created() {
    this.getUser();
    this.getAntraege();
    this.getActivities();
    window.addEventListener('scroll', this.animateProgressBar);

    this.getKarrieretagData();
    // const storageLogin = JSON.parse(localStorage.getItem('loginBleiben'));

    // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    //   console.info('This page is reloaded');
    // } else {
    //   if (storageLogin != null) {
    //     if (!storageLogin.login) {
    //       console.info('didtn wanted to stay');
    //       this.logout();
    //     } else {
    //       console.info('wanted to stay');
    //     }

    //     console.info('This page is not reloaded');
    //   }
    // }
  },

  data: () => ({
    languages: [
      { flag: 'us', language: 'en', title: 'English' },
      { flag: 'de', language: 'de', title: 'Deutsch' },
    ],
    user: {},
    createPdf: false,
    value: 0,
    query: false,
    pdf: null,
    show: true,
    karrieretagDaten: {},
    formular: true,
    interval: 0,
    infoId: '',
    impressId: '',
    drawer: false,
    dialog: false,
    showDialog: false,
    antraege: [],
    activities: [],
    dialogKarrieretagEintrag: false,
    extraItems: [
      {
        name: 'Formular',
        icon: 'mdi-note-text',
        route: '/anmeldeformular',
      },
      {
        name: 'Ihre Daten',
        icon: 'mdi-badge-account',
        route: '/daten',
      },
    ],
    adminitems: [
      {
        title: 'Dashboard',
        icon: 'mdi-desktop-mac-dashboard',
        route: '/dashboard',
      },
      {
        title: 'Aktivitäten',
        icon: 'mdi-history',
        route: '/activities',
      },
      {
        title: 'Anträge',
        icon: 'mdi-text-box-multiple',
        route: '/requests',
      },
      {
        title: 'Vorträge',
        icon: 'mdi-human-male-board',
        route: '/vortrag',
      },
      {
        title: 'Feedback Übersicht',
        icon: 'mdi-thumbs-up-down',
        route: '/manage-feedback',
      },
    ],
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard', route: '/' },
      { title: 'Informationen', icon: 'mdi-information', route: '/infos' },
      {
        title: 'Contact',
        icon: 'mdi-book-open-blank-variant',
        route: '/contact',
      },
    ],
    idOfkategorien: [
      {
        id: 'ueberuns',
      },
      {
        id: 'record',
      },

      {
        id: 'unternehmen',
      },
      {
        id: 'karrieretag',
      },
    ],
    right: null,
    // isloaded: false,
    showUpButton: false,
  }),
  mounted() {
    // document.onreadystatechange = () => {
    //   if (document.readyState == 'complete') {
    //     this.isloaded = true;
    //   }
    // };
  },
  methods: {
    async checkLogout(logout) {
      this.showDialog = false;
      if (logout) {
        this.dialog = true;
        await this.logout();
        this.dialog = false;
      }
    },
    async beforeDownload({ html2pdf, options, pdfContent }) {
      await html2pdf()
        .set(options)
        .from(pdfContent)
        .toPdf()
        .get('pdf')
        .then(async (pdf) => {
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            console.log(pdf)
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.setTextColor(150);
            pdf.text(
              'Seite ' + i + ' von ' + totalPages,
              pdf.internal.pageSize.getWidth() * 0.88,
              pdf.internal.pageSize.getHeight() - 0.3,
            );
          }
        })
        .save();
    },

    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    async sendmail(body) {
      await axios({
        url: '/sendmail/bytype',
        method: 'POST',
        contentType: 'application/json',
        data: {
          emails: [
            {
              name: body.firmen_name,
              email: body.email,
            },
          ],
          type: body.type,
          fullbody: body,
        },
      });
    },
    async getAntraege() {
      const { data } = await axios({
        url: '/antraege',
        method: 'GET',
      });
      this.antraege = data;
    },
    animateProgressBar() {
      const progressBar = document.querySelector('#progress-bar');
      const section = document.querySelector('#main');

      let scrollDistance = -section.getBoundingClientRect().top;
      let progressWidth =
        (scrollDistance /
          (section.getBoundingClientRect().height -
            document.documentElement.clientHeight)) *
        100;
      let value = Math.floor(progressWidth);
      progressBar.style.width = value + '%';
      if (value == 99) {
        progressBar.style.width = '100%';
      }
      if (value < 0 || value == 0) {
        this.showUpButton = false;
        progressBar.style.width = '0%';
      } else {
        this.showUpButton = true;
      }
    },
    getUser() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user != null) {
        this.user = user;
      } else localStorage.removeItem('user');
    },
    toTop() {
      window.scrollTo(0, 0);
    },
    async logout() {
      await axios({
        url: '/logout',
        method: 'GET',
      });
      localStorage.clear();
      if (this.$route.name != 'Home') {
        await this.$router.push('/');
        this.$router.go();
      }
      this.$router.go();
    },
    passId(id) {
      this.impressId = id;
      this.$router.push('/impress');
    },
    changeColor(id) {
      this.infoId = id;
      this.$router.push('/infos');
      // this.kategorien
      //   .filter((el) => el.id != id)
      //   .forEach(
      //     (el) =>
      //       (document.getElementById(`${el.id}`).style.background = 'none'),
      //   );
      // document.getElementById(`${id}`).style.background = 'yellow';
    },

    async getActivities() {
      const { data } = await axios({
        url: '/activities',
        method: 'GET',
      });
      this.activities = data;
    },

    async getKarrieretagData() {
      const { data } = await axios.get('/karrieretagdata');
      this.karrieretagDaten = data;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;400;800&display=swap');

html * {
  font-family: 'Titillium Web', sans-serif;
  overscroll-behavior-y: none;
}
body * {
  font-family: 'Titillium Web', sans-serif;

  overscroll-behavior-y: none;
}
#progress-bar {
  position: fixed;
  top: 0;
  height: 0;
  right: 0;
  left: 0;
  height: 5px;
  width: 0%;
  z-index: 100;
  transition: width 0.2s ease-out;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#up-circle {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 100;
}
</style>
