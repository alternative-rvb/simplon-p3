const AbstractManager = require('./AbstractManager');

class PostManager extends AbstractManager {
    constructor() {
        super({ table: 'posts' });
    }

    insert(post) {
        const { name, category, tags, os, website, image, date, review, featured, description, users_id } = post;
        return this.database.query(
            `INSERT INTO ${this.table} (name, category, tags, os, website, image, date, review, featured, description, users_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, category, JSON.stringify(tags), JSON.stringify(os), website, image, date, review, featured, description, users_id]
        );
    }

    update(post) {
        const { id, name, category, tags, os, website, image, date, review, featured, description, users_id } = post;
        return this.database.query(
            `UPDATE ${this.table} SET name = ?, category = ?, tags = ?, os = ?, website = ?, image = ?, date = ?, review = ?, featured = ?, description = ?, users_id = ? WHERE id = ?`,
            [name, category, JSON.stringify(tags), JSON.stringify(os), website, image, date, review, featured, description, users_id, id]
        );
    }
}

module.exports = PostManager;
