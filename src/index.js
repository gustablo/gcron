const JobsStorage = require('./jobs-storage');

class GCron {
    constructor(strategy) {
        this.jobs = new JobsStorage();
        this.strategy = new strategy();
    }

    start() {
        this.strategy.start(this.jobs);
    }

    register(expression, taskPath) {
        this.jobs.add({ expression, taskPath });
    }
}

module.exports = GCron;
