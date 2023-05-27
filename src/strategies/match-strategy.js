const { Worker } = require('node:worker_threads');
const path = require('node:path');

class MatchStrategy {
    start(jobs) {
        const matchThread = new Worker(path.resolve(__dirname, '..', 'daemons', 'match-daemon.js'));

        matchThread.postMessage(jobs.getJobs());
    }
}

module.exports = MatchStrategy;
