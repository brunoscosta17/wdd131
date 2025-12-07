const STORAGE_KEY = 'dsj-entries';

function loadEntries() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
}

function saveEntries(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function updateEntryCount(entries) {
    const span = document.querySelector('#entry-count');
    if (span) span.textContent = entries.length;
}

function renderEntries(entries) {
    const list = document.querySelector('#entries-list');
    if (!list) return;

    if (!entries.length) {
        list.innerHTML = '<li>No entries yet. Your first one will appear here.</li>';
        return;
    }

    const html = entries.slice().reverse().map(entry => `
    <li>
      <h3>${entry.date} • ${entry.passage}</h3>
      <p><strong>Feeling:</strong> ${entry.feeling}</p>
      ${entry.note ? `<p>${entry.note}</p>` : ''}
      ${entry.name ? `<p class="entry-author">– ${entry.name}</p>` : ''}
    </li>
  `).join('');

    list.innerHTML = html;
}

function handleJournalSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const date = form.date.value;
    const passage = form.passage.value.trim();
    const feeling = form.feeling.value;
    const note = form.note.value.trim();
    const name = form.name.value.trim();

    // Condicional simples de validação
    if (!date || !passage || !feeling) {
        // TODO: mostrar mensagem amigável no DOM em vez de alert
        alert('Please fill date, passage, and feeling.');
        return;
    }

    const newEntry = {
        date,
        passage,
        feeling,
        note,
        name
    };

    const entries = loadEntries();
    entries.push(newEntry);
    saveEntries(entries);

    form.reset();

    updateEntryCount(entries);
    renderEntries(entries);
}

document.addEventListener('DOMContentLoaded', () => {
    const entries = loadEntries();
    updateEntryCount(entries);
    renderEntries(entries);

    const form = document.querySelector('#journal-form');
    if (form) {
        form.addEventListener('submit', handleJournalSubmit);
    }
});
