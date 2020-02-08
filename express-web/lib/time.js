const moment = require('moment');

const nowToString = () => moment().format('YYYY-MM-DD HH:mm:ss.SSS');

const nowToTimestamp = () => moment().unix();

module.exports = {
    nowToString,
    nowToTimestamp
};
