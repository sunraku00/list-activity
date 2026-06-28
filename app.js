// app.js

let activities = [];

// Tugas 5
const addActivity = (title, deadline, note) => {
  if (!title) {
    showError('Judul tidak boleh kosong');
    return;
  }

  if (!deadline) {
    showError('Deadline tidak boleh kosong');
    return;
  }

  const newActivity = new Activity(title, deadline, note);
  activities = [...activities, newActivity]; // immutable

  // Clear inputs and error
  document.getElementById('input-title').value = '';
  document.getElementById('input-deadline').value = '';
  document.getElementById('input-note').value = '';
  clearError();

  render();
};

// Tugas 6
const completeActivity = (id) => {
  activities = activities.map(act => {
    if (act.id === id) {
      act.complete(); // pakai method class
    }
    return act;
  });

  render();
};

// Tugas 7
const undoActivity = (id) => {
  activities = activities.map(act => {
    if (act.id === id) {
      act.undoComplete(); // pakai method class
    }
    return act;
  });

  render();
};

// Tugas 8
const deleteActivity = (id) => {
  activities = activities.filter(act => act.id !== id); // WAJIB filter

  render();
};

// Tugas 9
const renderCard = (activity) => {
  const noteHtml = activity.note ? `<p class="activity-note">${activity.note}</p>` : '';

  return `
    <div class="activity-card ${activity.isDone ? 'done' : ''}">
      <div class="card-info">
        <h4>${activity.title}</h4>
        ${noteHtml}
        <small>Deadline: ${activity.deadline} • ${activity.status}</small>
      </div>

      <div class="card-actions">
        ${!activity.isDone
      ? `<button class="btn-icon btn-complete" onclick="completeActivity(${activity.id})">✔</button>`
      : `
              <button class="btn-icon btn-undo" onclick="undoActivity(${activity.id})">↩</button>
              <button class="btn-icon btn-delete" onclick="deleteActivity(${activity.id})">🗑</button>
            `
    }
      </div>
    </div>
  `;
};

// Render function
const render = () => {
  // Update overall statistics
  const totalCount = activities.length;
  const doneCount = activities.filter(act => act.isDone).length;
  const pendingCount = totalCount - doneCount;

  document.getElementById('stat-total').textContent = totalCount;
  document.getElementById('stat-done').textContent = doneCount;
  document.getElementById('stat-pending').textContent = pendingCount;

  // Apply search filter
  const searchInput = document.getElementById('input-search').value.toLowerCase();
  const filteredActivities = activities.filter(act =>
    act.title.toLowerCase().includes(searchInput)
  );

  const pendingActivities = filteredActivities.filter(act => !act.isDone);
  const doneActivities = filteredActivities.filter(act => act.isDone);

  const pendingContainer = document.getElementById('pending-list');
  const doneContainer = document.getElementById('done-list');

  // Handle pending list rendering
  if (pendingActivities.length === 0) {
    pendingContainer.innerHTML = `
      <div class="empty-state">
        <span>📭</span>
        Belum ada aktivitas yang harus dilakukan.
      </div>
    `;
  } else {
    pendingContainer.innerHTML = pendingActivities.map(renderCard).join('');
  }

  // Handle completed list rendering
  if (doneActivities.length === 0) {
    doneContainer.innerHTML = `
      <div class="empty-state">
        <span>🎉</span>
        Belum ada aktivitas yang diselesaikan.
      </div>
    `;
  } else {
    doneContainer.innerHTML = doneActivities.map(renderCard).join('');
  }

  // Update counters
  document.getElementById('count-pending').textContent = pendingActivities.length;
  document.getElementById('count-done').textContent = doneActivities.length;
};

// Error handling functions
const showError = (message) => {
  const errorEl = document.getElementById('error-msg');
  errorEl.textContent = message;
  errorEl.classList.add('show');
};

const clearError = () => {
  const errorEl = document.getElementById('error-msg');
  errorEl.classList.remove('show');
  errorEl.textContent = '';
};

// Event listeners setup
document.addEventListener('DOMContentLoaded', () => {
  const btnSubmit = document.getElementById('btn-submit');
  const inputTitle = document.getElementById('input-title');
  const inputDeadline = document.getElementById('input-deadline');
  const inputSearch = document.getElementById('input-search');
  const inputNote = document.getElementById('input-note');

  inputSearch.addEventListener('input', render);

  btnSubmit.addEventListener('click', () => {
    const title = inputTitle.value.trim();
    const deadline = inputDeadline.value;
    const note = inputNote.value.trim();
    addActivity(title, deadline, note);
  });

  // Also support pressing Enter in the text input
  inputTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const title = inputTitle.value.trim();
      const deadline = inputDeadline.value;
      const note = inputNote.value.trim();
      addActivity(title, deadline, note);
    }
  });

  // Clear error messages when user types or selects date
  inputTitle.addEventListener('input', clearError);
  inputDeadline.addEventListener('input', clearError);

  // Initial render on page load
  render();
});