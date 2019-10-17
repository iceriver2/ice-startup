const express = require('express');
const mod = express.Router({});

const path = require('path');

const { getFakeData } = require('../model/model');

// curl http://localhost:3000/demo/demo/
mod.get('/', (req, res) => {
    res.json(getFakeData());
});

// curl http://localhost:3000/demo/demo/hello
mod.get('/hello', (req, res) => {
    res.render(`${path.resolve(__dirname, '../')}/static/hello.html`, { user: 'iceman' });
});

// curl -d a=1 http://localhost:3000/demo/demo/foo?b=2
mod.post('/foo', (req, res) => {
    res.send(JSON.stringify(req.query) + JSON.stringify(req.body));
    res.end();
});

module.exports = mod;
