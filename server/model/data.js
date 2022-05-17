/* eslint-disable operator-linebreak */
/* eslint-disable no-useless-concat */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/order
const db = require('../db');

const bcrypt = require('bcrypt');
require('dotenv').config();

// eslint-disable-next-line import/order
const mailjet = require('node-mailjet').connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE,
);

async function updateBuchhaltungGesendet(id) {
  await db.query(
    'UPDATE firma SET buchhaltung_gesendet = $1 where firmen_id = $2',
    [true, id],
  );
}
function sendEmailBuchhaltung(body) {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'mansour.m02@htlwienwest.at',
          Name: 'Karrieretag HTL Wien West',
        },
        To: [
          {
            Email: 'mansour.m02@htlwienwest.at',
            Name: 'Buchhaltung',
          },
        ],
        Subject: 'Karrieretag Rechnungsadressen',
        TextPart: 'Karrieretag HTL Wien West',
        HTMLPart: `Sehr geehrte Damen und Herren, <br/> anbei die Rechnunsanschrift der Firma <b>${body.firma.firmen_name}</b>.
        <br/><br/>

Mit freundlichen Grüßen<br/>
Ihr Karrieretag-Team`,
        Attachments: [
          {
            ContentType: 'application/pdf',
            Filename: `${body.file}.pdf`,
            Base64Content: `${body.base64}`,
          },
        ],
      },
    ],
  });
  request
    .then(() => {
      console.log('Erfolgreich abgeschickt');
      updateBuchhaltungGesendet(body.firma.firmen_id);
    })
    .catch((err) => {
      console.log(err);
    });
}

function sendEmail(body) {
  body.emails.forEach((el) => {
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'mansour.m02@htlwienwest.at',
            Name: 'Karrieretag HTL Wien West',
          },
          To: [el],
          Subject: body.subject,
          TextPart: 'Karrieretag HTL Wien West',
          HTMLPart: `${body.message}`,
        },
      ],
    });
    request
      .then(() => {
        console.log('Erfolgreich abgeschickt');
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
function sendEmailByStatus(body) {
  if (body.type === 'antrag' || body.type === 'Antrag') {
    body.subject = 'Karrieretag der HTL Wien West';
    body.message = `Dies ist eine automatisch generierte E-Mail von karrieretag@htlwienwest.at <br/><br/> Liebes ${body.emails[0].name} Team,<br/><br/>
vielen Dank für Ihr Interesse an dem Karrieretag 2022 der HTL Wien West. <br/>
Ihr Antrag wird überprüft und Sie werden in Kürze eine Rückmeldung von uns erhalten.<br/><br/>

Mit freundlichen Grüßen<br/>
Ihr Karrieretag-Team
`;
    sendEmail(body);
  } else if (body.type === 'daten' || body.type === 'Daten') {
    console.log(body);
    body.subject = 'Karrieretag der HTL Wien West';
    body.message = `Liebes ${body.emails[0].name} Team,<br/><br/>
wir freuen uns Ihnen mitteilen zu dürfen, dass Sie an dem Karrieretag 2022 teilnehmen können. Nun fehlt nur noch Ihre Anmeldung.<br/>
Dies sind Ihre Login-Daten, mit welchen Sie sich auf der Website anmelden können, um ihre vollständigen Daten einzutragen:<br/><br/>
<b>User-ID</b>: ${body.fullbody.user_id}<br/>
<b>Password</b>: ${body.fullbody.passwort}<br/><br/>

Bei weiteren Fragen zu der Veranstaltung melden Sie sich gerne bei uns.<br/><br/>

Mit freundlichen Grüßen<br/>
Ihr Karrieretag-Team
`;
    sendEmail(body);
  } else if (body.type === 'teilnehmer' || body.type === 'Teilnehmer') {
    body.subject = 'Karrieretag der HTL Wien West';
    body.message = `Liebes ${body.emails[0].name} Team,<br/><br/>
wir haben Ihr Anmeldeformular erhalten und können Ihnen somit Ihre Teilnahme am Karrieretag 2022 der HTL WIEN WEST bestätigen.<br/>
Bei weiteren Fragen zu der Veranstaltung melden Sie sich gerne bei uns.<br/><br/>

Mit freundlichen Grüßen <br/>
Ihr Karrieretag-Team
`;

    sendEmail(body);
  } else if (body.type === 'abgelehnt' || body.type === 'Abgelehnt') {
    body.subject = 'Karrieretag der HTL Wien West';
    body.message = `Liebes ${body.emails[0].name} Team,<br/><br/>
leider müssen wir Ihnen mitteilen, dass wir Sie bei dem diesjährigen Karrieretag nicht berücksichtigen können.<br/> 
Wir danken nochmals für Ihr Interesse!<br/><br/>

Mit freundlichen Grüßen<br/>
Ihr Karrieretag-Team

`;
    sendEmail(body);
  } else if (body.type === 'gesehen' || body.type === 'Gesehen') {
    body.subject = 'Karrieretag der HTL Wien West';
    body.message = `Liebes ${body.emails[0].name} Team,<br/><br/>
vielen Dank für Ihren Antrag sowie Ihr Interesse am Karrieretag der HTL Wien West. <br/>
Hiermit wird ihr Antrag von Robert Baumgartner bestätigt.<br/>
Sie bekommen demnächst weitere Informationen zu dem Karrieretag.<br/><br/>

Mit freundlichen Grüßen<br/>
Ihr Karrieretag-Team

`;
    sendEmail(body);
  }
}
async function getAnmeldedaten() {
  const { rows } = await db.query(
    'SELECT * from anmeldedaten JOIN firma USING(firmen_id) ',
  );
  return rows;
}

async function getAdmindaten() {
  const { rows } = await db.query('SELECT * from administrator');
  return rows;
}

async function getAnträge() {
  const { rows } = await db.query(
    'SELECT * from firma JOIN ansprechperson a on firma.firmen_id = a.firmen_id ORDER BY anfrage_zeitpunkt desc',
  );

  return rows;
}
async function getActivities() {
  const { rows } = await db.query(
    'SELECT * from history JOIn firma f on history.firmen_id = f.firmen_id ORDER BY time desc',
  );

  return rows;
}

async function getTeilnehmer() {
  const { rows } = await db.query(
    "SELECT * from firma where status = 'Teilnehmer' ORDER BY fachrichtung",
  );
  return rows;
}

async function getFirma(id) {
  const { rows } = await db.query(
    'SELECT * from firma JOIN ansprechperson a on firma.firmen_id = a.firmen_id where firma.firmen_id=$1',
    [id],
  );
  return rows[0];
}

async function getAnzahlByDatum() {
  const { rows } = await db.query(
    'SELECT anfrage_zeitpunkt as datum,COUNT(*) as anzahl from firma group by anfrage_zeitpunkt order by anfrage_zeitpunkt',
  );
  return rows;
}

async function addAntrag(body) {
  const { rows } = await db.query(
    "INSERT INTO firma (status,firmen_name, firmen_mail, fachrichtung, platz, aufbauhilfe, rechnungsadresse, anfrage_zeitpunkt, url,ansprechpartner_ausstellung_tel, ansprechpartner_ausstellung_mail, vortrag_auswahl, ferialpraktikum_auswahl, sponsoring_interessiert,firmen_kommentar, tel_ferialpraktikum, mail_ferialpraktikum, formular,ansprechpartner_teilnahme_tel,ansprechpartner_teilnahme_mail,ausstellung_wie_homepage,logged_in_first_time,gesehen,feedback,buchhaltung_gesendet) VALUES ('Anfrage',$1,$2,null,null,null,null,$3,null,null,null,null,null,null,null,null,null,null,null,null,null,false,false,false,false) returning firmen_id;",
    [body.firmen_name, body.firmen_mail, body.zeitpunkt],
  );
  await db.query(
    'INSERT INTO ansprechperson (firmen_id, mail, telefonnummer,vorname,nachname) VALUES($1,null,$2,$3,$4)',
    [rows[0].firmen_id, body.phone, body.firstname, body.lastname],
  );
  return rows[0];
}

async function updateStatus(id, status) {
  if (status === 'gesehen' || status === 'Gesehen') {
    const { rows } = await db.query(
      'UPDATE firma SET gesehen = $1 where firmen_id = $2 returning firmen_id',
      [true, id],
    );
    return rows[0];
  }
  const { rows } = await db.query(
    'UPDATE firma SET status = $1 where firmen_id = $2 returning firmen_id',
    [status, id],
  );
  return rows[0];
}

async function updateLoginStatus(id) {
  const { rows } = await db.query(
    'UPDATE firma SET logged_in_first_time = true where firmen_id = $1 returning firmen_id',
    [id],
  );
  return rows[0];
}

async function addActivity(body) {
  const { rows } = await db.query(
    'INSERT INTO history(type,time,firmen_id) VALUES($1,$2,$3) returning history_id',
    [body.type, body.time, body.firmen_id],
  );
  return rows[0];
}

async function SetAnmeldeformular(id, body) {
  const newProps = [];
  // eslint-disable-next-line guard-for-in
  for (const key in body) {
    newProps.push(`${key}='${body[key]}'`);
  }
  const { rows } = await db.query(
    `UPDATE firma set ${newProps.join(
      ',',
    )} where firmen_id = $1 returning firma`,
    [id],
  );
  return rows;
}

function generateDidgetsAndLetters() {
  let pass = '';
  const str =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789$';

  for (let i = 1; i <= 8; i++) {
    const char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }

  return pass;
}

async function sendAnmeldeDaten(body) {
  const user = generateDidgetsAndLetters();
  const pass = generateDidgetsAndLetters();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  const { rows } = await db.query(
    'INSERT INTO anmeldedaten(passwort,user_id,firmen_id) VALUES($1,$2,$3) returning passwort,user_id,firmen_id',
    [hashedPassword, user, body.firmen_id],
  );
  return { firma: rows[0], user_id: user, passwort: pass };
}
async function getVortragsdaten() {
  const { rows } = await db.query(
    "SELECT anfangvortrag,vortrag.firmen_id,vortrag.fachrichtung as vortrag_fachrichtung, endevortrag, vortrag.vortrag_id, firma.fachrichtung as fachrichtung, firmen_name from vortrag JOIN firma USING(firmen_id) where vortrag_auswahl IS NOT NULL AND vortrag_auswahl != ''",
  );
  return rows;
}

async function addVortrag(body) {
  const { rows } = await db.query(
    'INSERT INTO vortrag (anfangvortrag,firmen_id,fachrichtung,endevortrag) VALUES($1,$2,$3,$4)',
    [body.anfangvortrag, body.firmen_id, body.fachrichtung, body.endevortrag],
  );
  return rows;
}

async function getFirmenVorträge() {
  const { rows } = await db.query(
    "SELECT * from firma where vortrag_auswahl IS NOT NULL AND vortrag_auswahl != ''",
  );
  return rows;
}

async function addFeedback(body) {
  const { rows } = await db.query(
    'INSERT INTO feedback (dauer,nicht_gefallen,gefallen,gesamt_zufriedenheit,kommentar,teilnahme_prozess,erneute_teilnahme,organisiert,kommunikation,firmen_id,feedback_zeitpunkt) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning firmen_id',
    [
      body.dauer,
      body.nicht_gefallen,
      body.gefallen,
      body.gesamt_zufriedenheit,
      body.kommentar,
      body.teilnahme_prozess,
      body.erneute_teilnahme,
      body.organisiert,
      body.kommunikation,
      body.firmen_id,
      body.zeitpunkt,
    ],
  );
  await db.query('UPDATE firma set feedback=$1 where firmen_id=$2', [
    true,
    body.firmen_id,
  ]);
  return rows;
}

async function getFeedbacks() {
  const { rows } = await db.query(
    'SELECT * from feedback JOIN firma USING (firmen_id) ORDER BY feedback_zeitpunkt DESC',
  );
  return rows;
}

async function getFeedbackData() {
  const kommunikation = await db.query(
    'SELECT kommunikation, COUNT(*) as kommunikation_count from feedback GROUP BY kommunikation ORDER BY kommunikation',
  );
  const teilnahmeProzess = await db.query(
    'SELECT teilnahme_prozess, COUNT(*) as teilnahme_prozess_count from feedback GROUP BY teilnahme_prozess ORDER BY teilnahme_prozess;',
  );
  const erneuteTeilnahme = await db.query(
    'SELECT erneute_teilnahme, COUNT(*) as erneute_teilnahme_count from feedback GROUP BY erneute_teilnahme ORDER BY erneute_teilnahme;',
  );
  const organisiert = await db.query(
    'SELECT organisiert, COUNT(*) as organisiert_count from feedback GROUP BY organisiert ORDER BY organisiert;',
  );
  const dauer = await db.query(
    'SELECT dauer, COUNT(*) as dauer_count from feedback GROUP BY dauer ORDER BY dauer;',
  );
  return {
    kommunikation: kommunikation.rows,
    teilnahmeProzess: teilnahmeProzess.rows,
    erneuteTeilnahme: erneuteTeilnahme.rows,
    organisiert: organisiert.rows,
    dauer: dauer.rows,
  };
}

async function getKarrieretagDaten() {
  const { rows } = await db.query(
    'SELECT * from karrieretag ORDER BY datum DESC',
  );
  return rows[0];
}
const patchUhrzeit = async (body, id) => {
  await db.query(
    'UPDATE vortrag set anfangvortrag = $1, endevortrag = $2 where vortrag_id = $3',
    [body.anfangvortrag, body.endevortrag, id],
  );
};
async function delVortrag(id) {
  await db.query('DELETE from vortrag where vortrag_id = $1', [id]);
}
async function getVortrag(id) {
  const { rows } = await db.query(
    'SELECT * from vortrag where vortrag_id = $1',
    [id],
  );
  return rows;
}

async function updateKarrieretag(body) {
  const { rows } = await db.query(
    'UPDATE karrieretag SET datum=$1 returning datum',
    [body.datum],
  );
  return rows;
}

async function deleteDataFromDatabase() {
  const { rows } = await db.query('DELETE FROM firma returning *');
  return rows;
}

module.exports = {
  getAnträge,
  getFirmenVorträge,
  getTeilnehmer,
  addVortrag,
  getVortragsdaten,
  getAdmindaten,
  getAnmeldedaten,
  getAnzahlByDatum,
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
};
