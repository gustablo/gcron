const GCron = require('../src/index');
const { MatchStrategy, SleepStrategy } = require('../src/strategies');
const path = require('path');

const cron = new GCron(MatchStrategy);

cron.register('34 * * * *', path.resolve(__dirname, 'job1.js'));
cron.register('35 * * * *', path.resolve(__dirname, 'job2.js'));

cron.start();
