const uuidGenerator = require('node-uuid');

class Operation {

    constructor(userId, label, category, date, amount, id = null, uuid = uuidGenerator.v1()) {
        this.id = id;
        this.uuid = uuid;
        this.userId = userId;
        this.label = label;
        this.category = category;
        this.date = date;
        this.amount = amount;
    }
}

module.exports = Operation;