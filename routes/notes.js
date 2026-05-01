const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/', notesController.getAllNotes);
router.post('/', notesController.addNote);
router.delete('/:id', notesController.deleteNote);
router.put('/:id', notesController.updateNote); // Tambahkan baris ini

module.exports = router;