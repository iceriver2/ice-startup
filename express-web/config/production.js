const httpConfig = {
    port: 80,
    hostname: 'localhost'
};

const mysqlConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root'
};

const redisConfig = {
    host: 'localhost',
    port: 6379,
    db: 1,
    password: '',
    ttl: 3600
};

const logConfig = {
    enable: true,
    interval: '1d',
    path: 'log',
    file: 'access.log'
};

module.exports = {
    httpConfig,
    mysqlConfig,
    redisConfig,
    logConfig
};
