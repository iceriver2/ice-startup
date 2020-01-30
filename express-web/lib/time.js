const moment = require('moment');

const now = (fmt = 'YYYY-MM-DD HH:mm:ss.SSS') => moment().format(fmt);

const today = (fmt = 'YYYY-MM-DD') => moment().format(fmt);

const timestamp = () => moment().unix();

module.exports = {
    now,
    today,
    timestamp
};
