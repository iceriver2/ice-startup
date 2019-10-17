const debug = require('debug')('server:index');

const app = require('./server');

const { ENV } = require('./config/const');
const { httpConfig } = require(`./config/${ENV}`);

app.listen(httpConfig, () => {
    debug(`Server services on port ${httpConfig.hostname}:${httpConfig.port}`);
});