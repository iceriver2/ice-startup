const debug = require('debug')('server:index');
const express = require('express');
const body= require('body-parser');
const cors = require('cors');
const ejs = require('ejs');
const cookie = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');

// import configurations
const { ENV, MOD, LIB } = require('./config/const');
const { httpConfig, mysqlConfig, redisConfig, logConfig } = require(`./config/${ENV}`);

// import functions
const { nowToString } = require(`${LIB}/time`);
const { readDirsInDir, requireOrExit } = require(`${LIB}/file`);

// create app
const app = express();

// use logger
if (logConfig.enable) {
    const logger = rfs(logConfig.file, { interval: logConfig.interval, path: path.join(__dirname, logConfig.path) });
    app.use(morgan('common', { stream: logger }));
}

// use html engine
app.engine('html', ejs.renderFile);

// use body, cookie, and so on
app.use(cors());
app.use(compression());
app.use(cookie());
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use(body.text());

// local variables
app.locals.LIB = LIB;

// import modules
readDirsInDir(MOD).forEach((dir) => {
    const mod = requireOrExit(dir);
    if (!mod) return;

    app.use(mod);
});

debug(`Server starts at ${nowToString()}`);

module.exports = app;