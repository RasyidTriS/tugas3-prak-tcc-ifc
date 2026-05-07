const API_URL = 'https://notes-backend-433898248394.asia-southeast2.run.app/api/notes';

// Ambil semua catatan saat halaman dibuka
document.addEventListener('DOMContentLoaded', getNotes);

async function getNotes() {
    const res = await fetch(API_URL);
    const data = await res.json();
    const list = document.getElementById('notes-list');
    const emptyState = document.getElementById('empty-state');
    list.innerHTML = '';

    if (data.length === 0) {
        list.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        list.style.display = 'grid';
        emptyState.style.display = 'none';
        
        data.forEach(note => {
            list.innerHTML += `
                <div class="note-card">
                    <h3>${note.judul}</h3>
                    <p>${note.isi}</p>
                    <small>${new Date(note.tanggal_dibuat).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</small>
                    <div class="actions">
                        <button onclick="editNote('${note.id}', '${note.judul}', '${note.isi}')">✏️ Edit</button>
                        <button class="delete" onclick="deleteNote(${note.id})">🗑️ Hapus</button>
                    </div>
                </div>
            `;
        });
    }
}

async function saveNote() {
    const id = document.getElementById('note-id').value;
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;

    if (!judul.trim() || !isi.trim()) {
        alert('Judul dan isi catatan tidak boleh kosong!');
        return;
    }

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
    if (confirm('Yakin ingin menghapus catatan ini?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        getNotes();
    }
}

function editNote(id, judul, isi) {
    document.getElementById('note-id').value = id;
    document.getElementById('judul').value = judul;
    document.getElementById('isi').value = isi;
    document.getElementById('btn-simpan').innerHTML = '<span class="btn-icon">✓</span><span>Update Catatan</span>';
    document.getElementById('btn-batal').style.display = 'inline-flex';
    document.getElementById('judul').focus();
}

function resetForm() {
    document.getElementById('note-id').value = '';
    document.getElementById('judul').value = '';
    document.getElementById('isi').value = '';
    document.getElementById('btn-simpan').innerHTML = '<span class="btn-icon">➕</span><span>Tambah Catatan</span>';
    document.getElementById('btn-batal').style.display = 'none';
}