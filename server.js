const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Untuk melayani file HTML nanti

app.use('/api/notes', notesRoutes);

app.listen(PORT, (err) => {
    if (err) {
        console.error(`Server gagal berjalan di port ${PORT}:`, err.message);
        process.exit(1);
    }

    console.log(`Server running on http://localhost:${PORT}`);
});
