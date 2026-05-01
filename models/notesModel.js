const db = require('../config/db');

class NotesModel {
    static async findAll() {
        return db.execute('SELECT * FROM notes ORDER BY tanggal_dibuat DESC');
    }

    static async create(judul, isi) {
        return db.execute('INSERT INTO notes (judul, isi) VALUES (?, ?)', [judul, isi]);
    }

    static async update(id, judul, isi) {
        return db.execute('UPDATE notes SET judul = ?, isi = ? WHERE id = ?', [judul, isi, id]);
    }

    static async delete(id) {
        return db.execute('DELETE FROM notes WHERE id = ?', [id]);
    }
}

module.exports = NotesModel;