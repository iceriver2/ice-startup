const { httpConfig, mysqlConfig, redisConfig, logConfig } = require('./production');

httpConfig.port = 3000;

module.exports = {
    httpConfig,
    mysqlConfig,
    redisConfig,
    logConfig
};
