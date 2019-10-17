const debug = require('debug')('server:index');
const express = require('express');
const body= require('body-parser');
const cors = require('cors');
const ejs = require('ejs');
const cookie = require('cookie-parser');
const compression = require('compression');

const { ENV, MOD, LIB } = require('./config/const');
const { httpConfig, mysqlConfig, redisConfig } = require(`./config/${ENV}`);

const { nowToString } = require(`${LIB}/time`);
const { readDirsInDir, requireOrExit } = require(`${LIB}/file`);

const app = express();

app.engine('html', ejs.renderFile);
app.use(cors());
app.use(compression());
app.use(cookie());
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use(body.text());

app.locals.LIB = LIB;

readDirsInDir(MOD).forEach((dir) => {
    const mod = requireOrExit(dir);
    if (!mod) return;

    app.use(mod);
});

debug(`Server starts at ${nowToString()}`);

module.exports = app;