// ── Collapsible panels ────────────────────────────────────────────────────────

document.querySelectorAll('.panel-header[data-target]').forEach(header => {
  const body = document.getElementById(header.dataset.target);
  const icon = header.querySelector('.toggle-icon');

  header.addEventListener('click', () => {
    const collapsed = body.classList.toggle('collapsed');
    icon.textContent = collapsed ? '[+]' : '[-]';
  });
});

// ── Checklist with localStorage persistence ───────────────────────────────────

const STORAGE_KEY = 'lanparty-checklist';

function applyCheckStyle(input) {
  const item = input.closest('.check-item');
  const box  = item.querySelector('.check-box');
  box.textContent = input.checked ? '[X]' : '[ ]';
  item.classList.toggle('done', input.checked);
}

function saveChecklist() {
  const state = {};
  document.querySelectorAll('.check-input[data-key]').forEach(input => {
    state[input.dataset.key] = input.checked;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadChecklist() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  document.querySelectorAll('.check-input[data-key]').forEach(input => {
    input.checked = !!saved[input.dataset.key];
    applyCheckStyle(input);
  });
}

document.querySelectorAll('.check-input').forEach(input => {
  input.addEventListener('change', () => {
    applyCheckStyle(input);
    saveChecklist();
  });
});

loadChecklist();
