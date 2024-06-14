const AbstractManager = require('./AbstractManager');

class UserManager extends AbstractManager {
    constructor() {
        super({ table: 'users' });
    }

    insert(user) {
        const { name, email, password } = user;
        return this.database.query(
            `INSERT INTO ${this.table} (name, email, password) VALUES (?, ?, ?)`,
            [name, email, password]
        );
    }

    update(user) {
        const { id, name, email, password } = user;
        return this.database.query(
            `UPDATE ${this.table} SET name = ?,  email = ?, password = ? WHERE id = ?`,
            [name,  email, password, id]
        );
    }
}

module.exports = UserManager;
