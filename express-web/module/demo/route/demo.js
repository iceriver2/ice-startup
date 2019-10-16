const express = require('express');
const mod = express.Router({});

const { getFakeData } = require('../model/model');

mod.get('/', (req, res) => {
    res.send(JSON.stringify(getFakeData()));
    res.end();
});

mod.get('/hello', (req, res) => {
    res.end('visit /hello');
});

module.exports = mod;
