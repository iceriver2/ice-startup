const { httpConfig, mysqlConfig, redisConfig } = require('./production');

httpConfig.port = 3000;

module.exports = {
    httpConfig,
    mysqlConfig,
    redisConfig
};
