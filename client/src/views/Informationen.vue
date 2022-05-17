<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="mx-auto" max-width="1000" elevation="0">
          <v-carousel
            hide-delimiters
            next-icon
            prev-icon
            cycle
            interval="4000"
            height="300"
          >
            <v-carousel-item
              v-for="i of images"
              :key="i.image"
              :src="i.image"
            ></v-carousel-item>
          </v-carousel>

          <v-card-title>
            <span id="karrieretag">Karrieretag</span>
          </v-card-title>

          <v-card-text class="text--primary" style="font-size:15px">
            Die HTL Wien West veranstaltet einmal im Jahr einen
            <b>Karrieretag</b> für die Schülerinnen und Schüler der
            Ausbildungsrichtungen
            <b
              >Elektrotechnik, Elektronik, Informationstechnologie, Maschinenbau
              und Mechatronik</b
            >. Zentrales Element ist eine Ausstellung von Unternehmen und
            Ausbildungsinstituten, die sich für unsere Absolventinnen und
            Absolventen interessieren. Wir laden Sie herzlich ein, aktiv mit
            einem Stand an unserem Karrieretag teilzunehmen. <br />
            <!--<br />
            Der nächste Karrieretag findet Mittwoch, den <b>9.3.2022</b> von
            <b>8:00 bis 14:00</b> in der HTL Wien West statt.<br /><br /> -->
            <div v-if="user.user == null">
              <b>Bei Interesse füllen Sie das </b>
              <router-link to="/antrag" class="red--text text--darken-1"
                >Formular</router-link
              >
              <b> aus</b>.
              <br />
            </div>

            <br />
            Bitte beachten Sie, dass unser Platz aufgrund der räumlichen
            Gegebenheiten beschränkt ist und wir daher letztes Mal mit
            <b>52 Teilnehmern</b> das Maximum erreicht haben. <br />Wir gehen
            nach der Reihenfolge der Anmeldungen vor.
            <br />
            <br />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-col cols="12">
          <v-card elevation="0" max-width="1000">
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card elevation="0" max-width="1000">
            <v-card-title>
              Kategorien
            </v-card-title>
            <v-container class="d-flex flex-column">
              <v-btn
                v-for="k of kategorien"
                :key="k.name"
                text
                outlined
                class="ma-3"
                @click="getFocus(k.id)"
                >{{ k.name }}</v-btn
              >
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card elevation="0" max-width="1000">
            <v-card-title>
              Seiten
            </v-card-title>
            <v-container class="d-flex flex-column">
              <v-btn
                v-for="s of seiten"
                :key="s.name"
                rounded
                class="ma-3 red darken-4 white--text"
                :to="s.url"
                >{{ s.name }}</v-btn
              >
              <v-btn
                rounded
                v-if="user.user == null"
                class="ma-3 red darken-4 white--text"
                to="/antrag"
                >Formular ausfüllen</v-btn
              >
            </v-container>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="mx-auto " max-width="1000" elevation="0">
          <v-img
            class="white--text align-end"
            height="300px"
            src="@/assets/HTL.jpg"
            alt="HTL Wien West Abteilungen"
          >
          </v-img>

          <v-card-title>
            <span id="ueberuns">
              Technik · Umwelt · Digitalisierung
            </span>
          </v-card-title>

          <v-card-text class="text--primary">
            Um die Schülerinnen und Schüler für die Herausforderungen unserer
            Zeit gut vorzubereiten, widmet sich die HTL Wien West in allen ihren
            <b>technischen Ausbildungsrichtungen</b> noch stärker als bisher den
            Themen <b>Digitalisierung</b> und <b>Umwelt</b>. Wir sind überzeugt,
            dass die technischen Lösungen von morgen noch stärker als bisher an
            den Auswirkungen auf die Umwelt gemessen werden.
            <v-divider dark></v-divider>

            <b>Technik</b>, <b>Digitalisierung</b> und <b>Umweltschutz</b> gehen
            Hand in Hand und müssen vernetzt gedacht werden. Die vielzitierte
            Digitalisierung ist bereits angekommen und findet sich in allen
            Disziplinen der Technik, wie beispielsweise 3D-Modellierung,
            Simulationen und modernen Entwurfsmethoden, in allen Phasen moderner
            Produktentwicklung ist die Unterstützung von modernen
            Computernetzwerken state of the art.
            <v-divider dark></v-divider>

            Wir möchten, dass sich unsere Absolvent*innen gut am Arbeitsmarkt
            etablieren und neben technischer Expertise und digitalem Fachwissen
            auch wesentliche Umweltaspekte mit in die neue Arbeitswelt bringen.
            <v-divider dark></v-divider>

            Um die Kombination aus Technik, Umwelt und Digitalisierung zu
            ermöglichen, werden folgende Schwerpunkte gesetzt:<br /><br />
            <b>Maschinenbau</b>: Einführung der neuen Vertiefungsrichtungen
            Green Engineering und Smart and Digital Engineering<br /><br />
            <b>Elektrotechnik sowie Elektronik mit Technischer Informatik</b>:
            Vertiefende Ausbildung in den Bereichen erneuerbare Energien und
            ressourcenschonende Hardwareentwicklung<br /><br />
            <b>Informationstechnologie</b>: Vertiefende Ausbildung im Bereich
            Green IT. Dies beinhaltet die Optimierung des Ressourcenverbrauchs
            während der Herstellung, des Betriebs und der Entsorgung der Geräte.
            Die Schulleitung und die Lehrer*innen der HTL Wien West sind
            überzeugt, damit eine zukunftsorientierte und moderne Ausbildung zu
            ermöglichen und wünschen allen Schüler*innen mit diesen
            Ausbildungsrichtungen viel Freude und Erfolg.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-col cols="12">
          <v-card elevation="0">
            <v-card-title class="pl-0">
              <span id="rekord">Rückblick Karrieretag 2022</span>
            </v-card-title>
            <p>
              Großes Interesse an unseren Schülerinnen und Schülern gab es am
              alljährlichen <b>Karrieretag</b> an der HTL Wien West! <b>Knapp 60
              Unternehmen/Ausbildungseinrichtungen</b> nutzten die Gelegenheit und
              kamen an unsere Schule, um sich zu präsentieren. <b>Herzlichen Dank
              an alle Teilnehmer</b> für die super Stimmung und das große Interesse
              an unseren Schülerinnen und Schülern. Sowie an alle Helfer, die
              den Karrieretag ermöglicht haben.
            </p>
            <v-img
              class="white--text align-end"
              height="400"
              src="@/assets/rekord.jpg"
              alt="HTL Wien West Karrieretag Rekord"
            >
            </v-img>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="0" max-width="95%" class="mx-auto">
          <p
            class="pl-0 pb-0 pt-16"
            style="font-size: 1.25rem;font-weight: 500;letter-spacing: 0.0125em;
          "
          >
            <span id="unternehmen">
              Unternehmen und Bildungseinrichtungen die 2018 - 2020 am
              Karrieretag teilgenommen haben:</span
            >
          </p>
          <v-row>
            <v-col cols="4">
              <v-card-text v-for="k of firmenList1" :key="k.name" class=" pa-0"
                ><a
                  :href="k.url"
                  target="_blank"
                  style="text-decoration: none"
                  class="red--text text--darken-4 "
                  >{{ k.name }}</a
                ></v-card-text
              >
            </v-col>
            <v-col cols="4">
              <v-card-text v-for="k of firmenList2" :key="k.name" class=" pa-0"
                ><a
                  :href="k.url"
                  target="_blank"
                  style="text-decoration: none"
                  class="red--text text--darken-4 "
                  >{{ k.name }}</a
                ></v-card-text
              >
            </v-col>
            <v-col cols="4">
              <v-card-text v-for="k of firmenList3" :key="k.name" class=" pa-0"
                ><a
                  :href="k.url"
                  target="_blank"
                  style="text-decoration: none"
                  class="red--text text--darken-4 "
                  >{{ k.name }}</a
                ></v-card-text
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  created() {
    this.getUser();
  },

  props: {
    logged: {
      type: Boolean,
    },
    infoId: {
      type: String,
    },
  },
  mounted() {
    if (this.infoId.length > 0) {
      this.getFocus(this.infoId);
    }
  },

  data() {
    return {
      user: {},
      search: '',

      images: [
        {
          image: 'images/KT2020-0.jpg',
        },
        {
          image: 'images/KT2020-1.jpg',
        },
        {
          image: 'images/KT2020-2.jpg',
        },
        {
          image: 'images/KT2020-3.jpg',
        },

        {
          image: 'images/KT2020-4.jpg',
        },
        {
          image: 'images/KT2020-5.jpg',
        },
        {
          image: 'images/KT2020-6.jpg',
        },
        {
          image: 'images/KT2020-7.jpg',
        },

        {
          image: 'images/KT2020-8.jpg',
        },
        {
          image: 'images/KT2020-9.jpg',
        },
        {
          image: 'images/KT2020-10.jpg',
        },
        {
          image: 'images/KT2020-11.jpg',
        },
      ],
      kategorien: [
        {
          name: 'Über uns',
          id: 'ueberuns',
        },
        {
          name: 'Karrieretag',
          id: 'karrieretag',
        },
        {
          name: 'Rekord',
          id: 'rekord',
        },

        {
          name: 'Unternehmen 2018-2020',
          id: 'unternehmen',
        },
      ],
      seiten: [
        {
          name: 'Startseite',
          url: '/',
        },

        {
          name: 'Kontakt',
          url: '/contact',
        },
        {
          name: 'Impressum',
          url: '/impress',
        },
      ],
      firmenList1: [
        {
          name: 'A1 Telekom Austria AG',
          url: 'https://www.a1.net/ueber-a1',
        },
        { name: 'ABB AG', url: 'https://new.abb.com/at' },
        { name: 'Absolventenverband', url: 'https://www.htl-news.at/' },
        { name: 'Accenture', url: 'https://www.accenture.com/at-de' },
        {
          name: 'ACTIVE SOLUTION Ingenieurbüro AG',
          url: 'https://www.dasingenieurbuero.at/',
        },
        {
          name: 'ARZ Allgemeines Rechenzentrum GmbH',
          url: 'https://www.arz.at/m086/homepage/',
        },
        {
          name: 'Atos IT Solutions an Services GmbH',
          url: 'https://atos.net/en/',
        },
        { name: 'Banet GmbH', url: 'https://www.banet.at/' },
        {
          name: 'Bechtle IT-Systemhaus Österreich',
          url: 'https://www.bechtle.com/at/',
        },
        { name: 'BEKO', url: 'https://www.beko.at/' },
        { name: 'Bitmovin', url: 'https://bitmovin.com/' },
        {
          name: 'BMD Systemhaus GesmbH',
          url: 'https://www.bmd.com/startseite.html',
        },
        { name: 'Braintrust GesmbH', url: 'https://braintrust.at/' },
        {
          name: 'Bundesheer Cyberdefence Unit',
          url: 'https://www.bundesheer.at/',
        },
        { name: 'Bundesrechenzentrum', url: 'https://www.brz.gv.at/' },
        {
          name: 'cargo-partner GmbH',
          url: 'https://www.cargo-partner.com/de/int.html',
        },
        {
          name: 'Catalysts',
          url:
            'https://de.cloudflight.io/pressemitteilungen/catalysts-wird-cloudflight-42479/',
        },
        {
          name: 'Coca Cola HBC Austria GmbH',
          url: 'https://at.coca-colahellenic.com/',
        },
        { name: 'DBConcepts', url: 'https://www.dbconcepts.com/' },
        {
          name: 'Diamir Holding – Tailored Apps',
          url: 'https://www.tailored-apps.com/',
        },
        { name: 'Docolution GmbH', url: 'https://www.docolution.com/' },
        { name: 'Elin', url: 'https://www.elin.com/' },
        { name: 'epunkt GmbH', url: 'https://www.epunkt.com/' },
        { name: 'Faktor Zehn', url: 'https://www.faktorzehn.com/de/' },
      ],
      firmenList2: [
        { name: 'FERCHAU Austria GmbH', url: 'https://www.ferchau.com/at/de' },
        { name: 'FH Burgenland', url: 'https://www.fh-burgenland.at/' },
        { name: 'FH Campus Wien', url: 'https://www.fh-campuswien.ac.at/' },
        { name: 'FH St. Pölten', url: 'https://www.fhstp.ac.at/de' },
        { name: 'FH Technikum Wien', url: 'https://www.technikum-wien.at/' },
        { name: 'FH Wien der WKW', url: 'https://www.fh-wien.ac.at/' },
        { name: 'FH Wiener Neustadt', url: 'https://www.fhwn.ac.at/' },
        {
          name: 'Flughafen Wien AG',
          url: 'https://www.viennaairport.com/unternehmen/flughafen_wien_ag',
        },
        {
          name: 'Gebauer & Griller Kabelwerke GesmbH',
          url: 'https://www.gg-group.com/de',
        },
        { name: 'Herold Business Data', url: 'https://www.herold.at/' },
        { name: 'Hokify', url: 'https://hokify.at/' },
        {
          name: 'HR Consulting Alexander Wozak',
          url: 'https://www.hrconsulting.at/startseite.html',
        },
        { name: 'it-tects', url: 'https://www.it-tects.at/' },
        {
          name: 'IVM Technical Consultants Wien GmbH',
          url: 'https://www.ivm.at/',
        },
        { name: 'Jaggaer Austria', url: 'https://www.jaggaer.com/de' },
        { name: 'Johannes Kepler Universität', url: 'https://www.jku.at/' },
        { name: 'KSV1870 Holding AG', url: 'https://www.ksv.at/' },
        { name: 'maihiro GmbH', url: 'https://www.maihiro.com/' },
        {
          name: 'Montanuniversität Leoben',
          url: 'https://www.unileoben.ac.at/',
        },
        {
          name: 'New Design University',
          url: 'https://www.ndu.ac.at/new-design-university/',
        },
        {
          name: 'NOUS Wissensmanagement GmbH',
          url: 'https://www.nousdigital.net/de/',
        },
        { name: 'ÖBB', url: 'https://www.oebb.at/de/' },
        {
          name: 'Österreichische Hochschülerschaft',
          url: 'https://www.oeh.ac.at/',
        },
        {
          name: 'Otto Bock Health Care Product',
          url: 'https://www.ottobock.com/en/',
        },
      ],
      firmenList3: [
        {
          name: 'paysafecard Wertkarten GmbH',
          url: 'https://www.paysafecard.com/de/',
        },
        { name: 'Personal Zellner', url: 'https://www.personal-zellner.at/' },
        { name: 'PORR AG', url: 'https://porr.at/' },
        { name: 'ppedv AG', url: 'https://www.ppedv.de/' },
        { name: 'Raiffeisen Software', url: 'https://www.r-software.at/' },
        { name: 'Robert Bosch AG', url: 'https://www.bosch.at/' },
        { name: 'Rubicon IT GmbH', url: 'https://www.rubicon.eu/' },
        {
          name: 'Schindler Aufzüge und Fahrtreppen GmbH',
          url: 'https://www.schindler.com/at/internet/de/home.html',
        },
        {
          name: 'Schulmeister Management Consulting GmbH',
          url: 'https://www.schulmeister-consulting.com/',
        },
        { name: 'SEC Consult', url: 'https://sec-consult.com/de/' },
        { name: 'SEQIS GmbH', url: 'https://www.seqis.com/de/' },
        {
          name: 'Siemens Personaldienstleistungen GmbH',
          url:
            'https://new.siemens.com/at/de/unternehmen/ueber-uns/verbundene-unternehmen/spdl.html',
        },
        { name: 'softwareXperts', url: 'https://www.sw-xperts.com/' },
        { name: 'STEINER-HITECH GmbH', url: 'https://www.steiner-hitech.at/' },
        { name: 'StepStone Österreich GmbH', url: 'https://www.stepstone.at/' },
        { name: 'TECHSEARCH', url: 'https://www.techsearch.at/' },
        { name: 'TODAY', url: 'https://www.today-experts.com/de/' },
        {
          name: 'Trenkwalder Personaldienste GmbH',
          url: 'https://de.trenkwalder.com/',
        },
        {
          name: 'Werbeakademie des WIFI Wien',
          url: 'https://www.werbeakademie.at/',
        },
        {
          name: 'Westsächsische Hochschule Zwickau',
          url: 'https://www.fh-zwickau.de/',
        },
        { name: 'Wien Energie GmbH', url: 'https://www.wienenergie.at/' },
        { name: 'Wirtschaftsuniversität Wien', url: 'https://www.wu.ac.at/' },
      ],
    };
  },
  methods: {
    getUser() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user != null) {
        this.user = user;
      }
    },
    getFocus(id) {
      const impid = document.getElementById(id);
      this.kategorien
        .filter((el) => el.id != id)
        .forEach(
          (el) =>
            (document.getElementById(`${el.id}`).style.background = 'none'),
        );
      document.getElementById(`${id}`).style.background = 'yellow';
      impid.focus();
      impid.scrollIntoView();
    },
  },
};
</script>

<style lang="scss" scoped></style>
