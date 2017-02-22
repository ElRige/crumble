const uuidGenerator = require('node-uuid');

class User {

    constructor(email, username, password, id = null, uuid = uuidGenerator.v1()) {
        this.id = id;
        this.uuid = uuid;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

module.exports = User;