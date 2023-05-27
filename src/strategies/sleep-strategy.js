const { fork } = require("child_process");
const path = require("path");

class SleepStrategy {
    start(jobs) {
        jobs.forEach(this.forkJob.bind(this));
    }

    forkJob(job) {
        const forked = fork(path.resolve(__dirname, '..', 'daemons', 'sleep-daemon.js'));

        forked.on('message', () => {
            forked.kill();

            return this.forkJob(job);
        });

        forked.send({
            job,
        });
    }
}

module.exports = SleepStrategy;
