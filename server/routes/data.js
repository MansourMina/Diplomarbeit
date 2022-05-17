const express = require('express');

const router = express.Router();

const {
  getAnträge,
  getTeilnehmer,
  getAdmindaten,
  getAnmeldedaten,
  logout,
  getAnzahlByDatum,
  login,
  sendEmail,
  addAntrag,
  updateStatus,
  getActivities,
  addActivity,
  getFirma,
  SetAnmeldeformular,
  sendEmailByStatus,
  updateLoginStatus,
  sendAnmeldeDaten,
  getFirmenVorträge,
  getVortragsdaten,
  addVortrag,
  addFeedback,
  getFeedbacks,
  getFeedbackData,
  getKarrieretagDaten,
  patchUhrzeit,
  delVortrag,
  getVortrag,
  updateKarrieretag,
  deleteDataFromDatabase,
  sendEmailBuchhaltung,
} = require('../controllers/data');

router.get('/antraege', getAnträge);
router.get('/firma/:id', getFirma);
router.get('/activities', getActivities);
router.get('/vortrag', getVortragsdaten);
router.get('/vortrag/:id', getVortrag);
router.get('/firma', getFirmenVorträge);
router.get('/anzahlbydatum', getAnzahlByDatum);
router.get('/anmeldedaten', getAnmeldedaten);
router.get('/admindaten', getAdmindaten);
router.get('/teilnehmer', getTeilnehmer);
router.get('/feedbacks', getFeedbacks);
router.get('/feedbackdata', getFeedbackData);
router.get('/karrieretagdata', getKarrieretagDaten);
router.get('/logout', logout);

router.post('/login', login);
router.post('/antrag', addAntrag);
router.patch('/status/:id', updateStatus);
router.patch('/login/:id', updateLoginStatus);
router.patch('/anmeldeformular/:id', SetAnmeldeformular);
router.patch('/vortrag/:id', patchUhrzeit);
router.patch('/karrieretag', updateKarrieretag);

router.post('/sendmail', sendEmail);
router.post('/buchaltung', sendEmailBuchhaltung);
router.post('/sendmail/bytype', sendEmailByStatus);
router.post('/activities', addActivity);
router.post('/setanmeldedaten', sendAnmeldeDaten);
router.post('/vortrag', addVortrag);
router.post('/feedback', addFeedback);

router.delete('/vortrag/:id', delVortrag);
router.delete('/firmen', deleteDataFromDatabase);

module.exports = router;
