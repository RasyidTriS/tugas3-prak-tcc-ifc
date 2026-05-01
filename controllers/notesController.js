const NotesModel = require('../models/notesModel');

exports.getAllNotes = async (req, res) => {
    try {
        const [rows] = await NotesModel.findAll();
        res.json(rows);
    } catch (err) {
        console.error("Error ambil data:", err.message); // Menampilkan error di terminal VSCode/CMD kamu
        res.status(500).json({ error: err.message });
    }
};

exports.addNote = async (req, res) => {
    const { judul, isi } = req.body;
    try {
        await NotesModel.create(judul, isi);
        res.status(201).json({ message: "Catatan berhasil ditambahkan" });
    } catch (err) {
        console.error("Error tambah data:", err.message); // Menampilkan error di terminal VSCode/CMD kamu
        res.status(500).json({ error: err.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        await NotesModel.delete(req.params.id);
        res.json({ message: "Catatan berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateNote = async (req, res) => {
    const { judul, isi } = req.body;
    try {
        await NotesModel.update(req.params.id, judul, isi);
        res.json({ message: "Catatan berhasil diupdate" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};