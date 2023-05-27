const { parentPort } = require('node:worker_threads');

const TimeMatcher = require('../time-matcher');
const JobsStorage = require('../jobs-storage');
const Task = require('../task');

const DELAY = 1000;

class MatchDaemon {
    constructor() {
        this.task = new Task();
    }

    start(jobs) {
        const nextJobs = new JobsStorage();

        while (!jobs.isEmpty()) {
            const headJob = jobs.remove();
            this.task.setPath(headJob.taskPath);

            if (new TimeMatcher(headJob.expression).match(new Date())) {
                this.task.run();
                parentPort.postMessage('executed');
            }

            nextJobs.add(headJob);
        }

        setTimeout(() => this.start.call(this, nextJobs), DELAY);
    };
}

parentPort.once('message', (jobs) => new MatchDaemon().start(new JobsStorage(jobs)));
