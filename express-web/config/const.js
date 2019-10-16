const debug = require('debug')('server:const');
const path = require('path');

const ROOT = path.resolve(__dirname, '../');
debug('ROOT', ROOT);

const LIB = `${ROOT}/lib`;
debug('LIB', LIB);

const MOD  = `${ROOT}/module`;
debug('MOD', MOD);

const ENV = process.env.NODE_ENV || 'development';
debug('ENV', ENV);

module.exports = {
    LIB,
    MOD,
    ENV
};
