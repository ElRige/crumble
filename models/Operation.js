const uuidGenerator = require('node-uuid');

class Operation {

    constructor(userId, label, category, date, amount, id = null, uuid = uuidGenerator.v1()) {
        this.id = id;
        this.uuid = uuid;
        this.userId = userId;
        this.date = date;
        this.label = label;
        this.amount = amount;
        this.category = category;
    }
}

class OperationDto {

    constructor(uuid, date, label, amount, category) {
        this.uuid = uuid;
        this.date = date;
        this.label = label;
        this.amount = amount;
        this.category = category;
    }
}

let map = {

    toDto: function (operation) {
        return new OperationDto(operation.uuid, operation.date, operation.label, operation.amount, operation.category);
    },
    toDtos: function (operations) {
        let operationDtos = new Array();
        for (let tmp of operations) {
            operationDtos.push(map.toDto(tmp));
        }
        return operationDtos;
    }
};

module.exports.Operation = Operation;
module.exports.OperationDto = OperationDto;
module.exports.map = map;