const path = require('path');
const express = require('express');

const modName = path.basename(__dirname);

const debug = require('debug')(`server:${modName}`);

const mod = express.Router({});

mod.get('/', (req, res) => {
   res.end('OK');
});

debug(`module ${modName} included`);
module.exports = mod;
