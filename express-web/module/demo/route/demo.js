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
    res.render(`${path.resolve(__dirname, '../')}/static/hello.html`, { user: 'iceman' }, (err, html) => {
        res.type('html');
        res.send(html);
    });
});

// curl -d a=1 http://localhost:3000/demo/demo/foo?b=2
mod.post('/foo', (req, res) => {
    const obj = Object.assign({}, req.query, req.body);
    res.send(JSON.stringify(obj));
    res.end();
});

module.exports = mod;
