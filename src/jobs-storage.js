class JobsStorage {
    constructor(jobs) {
        if (jobs) {
            this.jobs = jobs;
            this.count = Object.keys(jobs).length;
        } else {
            this.jobs = {};
            this.count = 0;
        }
        this.head = 0;
    }

    forEach(cb) {
        for(let i = this.head; i < this.count; i++) {
            cb(this.jobs[i]);
        }
    }

    add(job) {
        this.jobs[this.count] = job;
        this.count++;
    }

    remove() {
        const removed = this.jobs[this.head];
        delete this.jobs[this.head];
        this.head++;

        return removed;
    }

    size() {
        return this.count - this.head;
    }

    isEmpty() {
        return this.size() === 0;
    }

    getJobs() {
        return this.jobs;
    }
}

module.exports = JobsStorage;
