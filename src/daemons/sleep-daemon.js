const TimeMatcher = require('../time-matcher');
const Task = require('../task');

class SleepDaemon {
    constructor() {
        this.task = new Task();
    }

    start(job) {
        this.task.setPath(job.taskPath);

        setTimeout(() => {
            this.task.run();
            process.send('executed');

        }, new TimeMatcher(job.expression).diff());
    }
}

process.on('message', ({ job }) => new SleepDaemon().start(job));
