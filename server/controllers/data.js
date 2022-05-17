/* eslint-disable operator-linebreak */
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const validator = require('email-validator');

const karrieretagModel = require('../model/data');

const deleteDataFromDatabase = asyncHandler(async (req, res) => {
  const firmen = await karrieretagModel.getAnträge();
  const rows = await karrieretagModel.deleteDataFromDatabase();

  if (firmen.length > 0) {
    res.status(200).json(`${rows} gelöscht`);
  } else res.status(204).send('Keine Daten vorhanden');
});
const updateKarrieretag = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.updateKarrieretag(req.body);
  res.status(200).json(rows);
});
const getVortrag = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getVortrag(req.params.id);
  res.status(200).json(rows);
});

const delVortrag = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getVortrag(req.params.id);
  if (rows.length > 0) {
    res.status(200).json(await karrieretagModel.delVortrag(req.params.id));
  } else {
    res.status(404).send(`Vortrag ${req.params.id} nicht vorhanden.`);
  }
});

const patchUhrzeit = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getVortrag(req.params.id);
  if (rows.length > 0) {
    res
      .status(200)
      .json(await karrieretagModel.patchUhrzeit(req.body, req.params.id));
  } else {
    res.status(404).send(`Vortrag ${req.params.id} not found in this database`);
  }
});

const getKarrieretagDaten = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getKarrieretagDaten();
  res.status(200).json(rows);
});

const getFeedbackData = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getFeedbackData();
  res.status(200).json(rows);
});
const getFeedbacks = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getFeedbacks();
  res.status(200).json(rows);
});
const getVortragsdaten = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getVortragsdaten();
  res.status(200).json(rows);
});

const addVortrag = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.addVortrag(req.body);
  res.status(200).json(rows);
});

const addFeedback = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.addFeedback(req.body);
  res.status(200).json(rows);
});
const getFirmenVorträge = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getFirmenVorträge();
  res.status(201).json(rows);
});
const getAnträge = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getAnträge();

  res.status(200).json(rows);
});

const SetAnmeldeformular = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.SetAnmeldeformular(
    req.params.id,
    req.body,
  );
  res.status(200).json(rows);
});

const sendEmailByStatus = asyncHandler(async (req, res) => {
  await karrieretagModel.sendEmailByStatus(req.body);
  res.status(200).json('Erfolgreich');
});

const sendEmailBuchhaltung = asyncHandler(async (req, res) => {
  await karrieretagModel.sendEmailBuchhaltung(req.body);
  res.status(200).json('Erfolgreich');
});
const sendAnmeldeDaten = asyncHandler(async (req, res) => {
  const result = await karrieretagModel.sendAnmeldeDaten(req.body);
  res.status(200).json(result);
});

const getFirma = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getFirma(req.params.id);
  if (rows != null) {
    return res.status(200).send(rows);
  }
  return res.status(404).send('Firma nicht gefunden!');
});
const getActivities = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getActivities();
  res.status(200).json(rows);
});
const addActivity = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.addActivity(req.body);
  res.status(200).json(rows);
});

const updateStatus = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.updateStatus(
    req.params.id,
    req.body.status,
  );
  res.status(200).json(rows);
});

const updateLoginStatus = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.updateLoginStatus(req.params.id);
  res.status(200).json(rows);
});

const addAntrag = asyncHandler(async (req, res) => {
  const valid = validator.validate(req.body.firmen_mail);
  if (valid) {
    await karrieretagModel.addAntrag(req.body);

    return res.send({ message: 'OK' });
  }
  return res.send({
    message: 'Please provide a valid email address.',
  });
});
const getAdmindaten = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getAdmindaten();
  res.status(200).json(rows);
});
const getAnmeldedaten = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getAnmeldedaten();
  res.status(200).json(rows);
});
const getTeilnehmer = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getTeilnehmer();
  res.status(200).json(rows);
});

const getAnzahlByDatum = asyncHandler(async (req, res) => {
  const rows = await karrieretagModel.getAnzahlByDatum();
  res.status(200).json(rows);
});

const login = asyncHandler(async (req, res) => {
  const { userId, passwort } = req.body;
  if (userId && passwort) {
    const admindaten = (await karrieretagModel.getAdmindaten()).find(
      (el) => el.user_id === userId,
    );

    const user = (await karrieretagModel.getAnmeldedaten()).find(
      (el) => el.user_id === userId,
    );

    if (admindaten) {
      const checkAdminPasswort = await bcrypt.compare(
        passwort,
        admindaten.passwort,
      );
      if (checkAdminPasswort) {
        req.session.userId = admindaten.user_id;
        res.status(200).json({
          user: admindaten,
          admin: true,
        });
      }
    } else {
      const checkUserPasswort = await bcrypt.compare(passwort, user.passwort);
      if (user && checkUserPasswort) {
        req.session.userId = user.firmen_id;
        res.status(200).json({
          user,
          admin: false,
        });
      } else res.status(401).send('Wrong name or password');
    }
  } else res.status(400).send('Login failed');
});

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) console.log('You are not logged in!');
  else next();
};

// eslint-disable-next-line operator-linebreak
const logout =
  (redirectLogin,
  (req, res) => {
    req.session.destroy();
    res.clearCookie(process.env.SESSION_NAME);
    res.status(200).send('erfolgreich ausgeloggt');
  });

const sendEmail = asyncHandler((req, res) =>
  res.status(200).json(karrieretagModel.sendEmail(req.body)),
);
module.exports = {
  getAnträge,
  getAnmeldedaten,
  getAdmindaten,
  getTeilnehmer,
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
  getVortragsdaten,
  addVortrag,
  getFirmenVorträge,
  addFeedback,
  getFeedbacks,
  getFeedbackData,
  getKarrieretagDaten,
  delVortrag,
  patchUhrzeit,
  getVortrag,
  deleteDataFromDatabase,
  updateKarrieretag,
  sendEmailBuchhaltung,
};
