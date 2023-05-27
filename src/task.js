class Task {
    setPath(path) {
        this.path = path;
    }

    run() {
        const execTask = require(this.path);        

        execTask();
    }
};

module.exports = Task;
