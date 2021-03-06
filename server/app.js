const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');
const session = require('express-session');
const history = require('connect-history-api-fallback');
const routes = require('./routes/data');

const { errorHandler, notFound } = require('./middleware/errorHandler');

require('dotenv').config();
require('colors');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(helmet());
app.use(express.static(path.join(__dirname, '/public')));
const { NODE_ENV, SESSION_LIFETIME, SESSION_NAME } = process.env;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, '/public')));
app.use(history());
app.use(express.static(path.join(__dirname, '/public')));
app.use(
  session({
    secret: crypto.randomBytes(20).toString('hex'),
    name: SESSION_NAME,
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: SESSION_LIFETIME * 1000 * 60 * 60,
      httpOnly: false,
      sameSite: true,
      secure: NODE_ENV === 'production',
    },
  }),
);
app.set('trust proxy', 1);

app.use('/', routes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT);
