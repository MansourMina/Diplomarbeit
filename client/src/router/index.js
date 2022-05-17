import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../viewsAdmin/Dashboard.vue';
import Feedback from '../views/Feedback.vue';
import Informationen from '../views/Informationen.vue';
import Impressum from '../views/Impressum.vue';
import NotFound from '../views/NotFound.vue';
import Formular from '../views/Formular.vue';
import Antrag from '../views/Antrag.vue';
import Daten from '../views/Daten.vue';
import Login from '../views/Login.vue';
import Contact from '../views/Contact.vue';
import Übersicht from '../components/PDFContent.vue';
import Anträge from '../viewsAdmin/Anträge.vue';
import Aktivitäten from '../viewsAdmin/Aktivitäten.vue';
import AdminFeedback from '../viewsAdmin/Feedback.vue';
import Vorträge from '../viewsAdmin/Vorträge.vue';
import axios from 'axios';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
  },
  {
    path: '/overview',
    name: 'Übersicht',
    component: Übersicht,
  },
  {
    path: '/requests',
    name: 'Anträge',

    component: Anträge,
  },
  {
    path: '/activities',
    name: 'Aktivitäten',
    component: Aktivitäten,
  },
  {
    path: '/manage-feedback',
    name: 'Feedback Admin',
    component: AdminFeedback,
  },
  {
    path: '/vortrag',
    name: 'Vortrag',
    component: Vorträge,
  },
  {
    path: '/infos',
    props: true,
    name: 'Informationen',
    component: Informationen,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/daten',
    name: 'Daten',
    component: Daten,
  },
  {
    path: '/antrag',
    name: 'Antrag',
    component: Antrag,
  },
  {
    path: '/anmeldeformular',
    name: 'Formular',
    component: Formular,
  },
  {
    path: '/impress',
    name: 'Impressum',
    component: Impressum,
  },

  {
    path: '*',
    component: NotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const karrieretagDate = await getKarrieretagData();
  const notFound = {
    name: 'NotFound',
    params: { pathMatch: to.path.split('/').slice(1) },
  };
  // Besucher darf nicht in
  if (!isAuthenticated() || user == null) {
    if (
      to.name == 'Dashboard' ||
      to.name == 'Vortrag' ||
      to.name == 'Aktivitäten' ||
      to.name == 'Daten' ||
      to.name == 'Anträge' ||
      to.name == 'Formular' ||
      to.name == 'Übersicht' ||
      to.name == 'Feedback Admin'
    ) {
      next(notFound);
    } else if (to.name == 'Feedback') {
      if (isToday(new Date(karrieretagDate))) next({ name: 'Login' });
      else next(notFound);
    }
  }

  if (user != null && isAuthenticated()) {
    // Admin darf nicht in
    if (
      user.admin == true &&
      (to.name == 'Daten' ||
        to.name == 'Antrag' ||
        to.name == 'Formular' ||
        to.name == 'Feedback')
    ) {
      next(notFound);
    }
    // Firma darf nicht in
    if (
      user.admin == false &&
      (to.name == 'Antrag' ||
        to.name == 'Anträge' ||
        to.name == 'Dashboard' ||
        to.name == 'Vortrag' ||
        to.name == 'Aktivitäten' ||
        to.name == 'Übersicht' ||
        to.name == 'Feedback Admin' ||
        (to.name == 'Feedback' && !isToday(new Date(karrieretagDate))))
    ) {
      next(notFound);
    } else if (to.name == 'Login') {
      next({ name: 'Home' });
    }
    next();
  }
  next();
});

function isAuthenticated() {
  if (Vue.$cookies.get('sid')) return true;
  else return false;
}

function isToday(karrieretag) {
  return Date.now() > karrieretag;
}

async function getKarrieretagData() {
  const { data } = await axios.get('/karrieretagdata');
  return data.datum;
}

export default router;
