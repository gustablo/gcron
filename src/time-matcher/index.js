const convertExpression = require('./convert-expression');

function matchPattern(pattern, value) {
    if (pattern.indexOf(',') !== -1) {
        const patterns = pattern.split(',');
        return patterns.indexOf(value.toString()) !== -1;
    }
    return pattern === value.toString();
}

class TimeMatcher {
    constructor(pattern) {
        this.pattern = convertExpression(pattern);
        this.expressions = this.pattern.split(' ');
    }

    match(date) {
        const runOnSecond = matchPattern(this.expressions[0], date.getSeconds());
        const runOnMinute = matchPattern(this.expressions[1], date.getMinutes());
        const runOnHour = matchPattern(this.expressions[2], date.getHours());
        const runOnDay = matchPattern(this.expressions[3], date.getDate());
        const runOnMonth = matchPattern(this.expressions[4], date.getMonth() + 1);
        const runOnWeekDay = matchPattern(this.expressions[5], date.getDay());

        return runOnSecond && runOnMinute && runOnHour && runOnDay && runOnMonth && runOnWeekDay;
    }

    diff() {
        
    }
}

module.exports = TimeMatcher;
