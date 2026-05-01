const API_URL = 'http://localhost:3000/api/notes';

// Ambil semua catatan saat halaman dibuka
document.addEventListener('DOMContentLoaded', getNotes);

async function getNotes() {
    const res = await fetch(API_URL);
    const data = await res.json();
    const list = document.getElementById('notes-list');
    list.innerHTML = '';

    data.forEach(note => {
        list.innerHTML += `
            <div class="note-card">
                <h3>${note.judul}</h3>
                <p>${note.isi}</p>
                <small>${new Date(note.tanggal_dibuat).toLocaleString('id-ID')}</small>
                <div class="actions">
                    <button onclick="editNote('${note.id}', '${note.judul}', '${note.isi}')">Edit</button>
                    <button class="delete" onclick="deleteNote(${note.id})">Hapus</button>
                </div>
            </div>
        `;
    });
}

async function saveNote() {
    const id = document.getElementById('note-id').value;
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul, isi })
    });

    resetForm();
    getNotes();
}

async function deleteNote(id) {
    if (confirm('Yakin ingin menghapus?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        getNotes();
    }
}

function editNote(id, judul, isi) {
    document.getElementById('note-id').value = id;
    document.getElementById('judul').value = judul;
    document.getElementById('isi').value = isi;
    document.getElementById('btn-simpan').innerText = 'Update Catatan';
    document.getElementById('btn-batal').style.display = 'inline';
}

function resetForm() {
    document.getElementById('note-id').value = '';
    document.getElementById('judul').value = '';
    document.getElementById('isi').value = '';
    document.getElementById('btn-simpan').innerText = 'Tambah Catatan';
    document.getElementById('btn-batal').style.display = 'none';
}