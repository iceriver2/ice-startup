const debug = require('debug')('server:index');
const express = require('express');

const { ENV, MOD, LIB } = require('./config/const');
const { httpConfig, mysqlConfig, redisConfig } = require(`./config/${ENV}`);

const { nowToString } = require(`${LIB}/time`);
const { readDirsInDir, requireOrExit } = require(`${LIB}/file`);

const app = express();
app.locals.LIB = LIB;

readDirsInDir(MOD).forEach((dir) => {
    const mod = requireOrExit(dir);
    if (!mod) return;

    app.use(mod);
});

app.listen(httpConfig.port, () => {
    debug(`Server on port ${httpConfig.port} from ${nowToString()} ...`);
});