const path = require('path');
const fs = require('fs');
const express = require('express');

const modName = path.basename(__dirname);
const dirName = 'route';

const debug = require('debug')(`server:${modName}`);

const mod = express.Router({});

fs.readdirSync(`${__dirname}/${dirName}`, { withFileTypes: true }).forEach((file) => {
   if (!file.isFile()) return false;

   const fileName = path.basename(file.name).replace(path.extname(file.name), '');
   mod.use(`/${modName}/${fileName}`, require(`./${dirName}/${fileName}`));
});

debug(`module ${modName} included`);
module.exports = mod;
