function toggleNotifications() {
  const panel = document.getElementById('notifications-panel');
  panel.classList.toggle('open');
}

function setProgress(percent) {
  const circle = document.querySelector('.progress-ring__circle');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDashoffset = offset;
  document.querySelector('.progress-percentage').textContent = percent + '%';
}

function animateProgress(from, to, duration = 800) {
  const start = performance.now();
  function animate(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(from + (to - from) * progress);
    setProgress(value);
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.querySelector('.main');
  const expandIcon = document.querySelector('.expand-icon');
  const collapseIcon = document.querySelector('.collapse-icon');
  if (sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    sidebar.classList.add('collapsed');
    if (main) main.classList.remove('sidebar-open');
    if (main) main.classList.add('sidebar-collapsed');
    if (expandIcon) expandIcon.style.display = 'inline-block';
    if (collapseIcon) collapseIcon.style.display = 'none';
  } else if (sidebar.classList.contains('collapsed')) {
    sidebar.classList.remove('collapsed');
    sidebar.classList.add('open');
    if (main) main.classList.remove('sidebar-collapsed');
    if (main) main.classList.add('sidebar-open');
    if (expandIcon) expandIcon.style.display = 'none';
    if (collapseIcon) collapseIcon.style.display = 'inline-block';
  } else {
    sidebar.classList.add('collapsed');
    if (main) main.classList.add('sidebar-collapsed');
    if (expandIcon) expandIcon.style.display = 'inline-block';
    if (collapseIcon) collapseIcon.style.display = 'none';
  }
}

// Simula el progreso: primero 15%, luego 20% con animación
animateProgress(0, 15, 1000);
setTimeout(() => animateProgress(15, 20, 1000), 2000);

// Aplica el progreso a todos los círculos de progreso SVG
function setAllProgressCircles() {
  document.querySelectorAll('.progress-ring__circle').forEach(circle => {
    const percent = parseFloat(circle.getAttribute('data-progress'));
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = offset;
  });
}
setAllProgressCircles();

function openFiltersPanel() {
  document.getElementById('filters-panel').classList.add('open');
  document.getElementById('filters-panel-backdrop').style.display = 'block';
}

function closeFiltersPanel() {
  document.getElementById('filters-panel').classList.remove('open');
  document.getElementById('filters-panel-backdrop').style.display = 'none';
}

function toggleFiltersBar() {
  const bar = document.getElementById('dashboard-filters-bar');
  const icon = document.getElementById('collapse-filters-icon');
  bar.classList.toggle('collapsed');
  if (bar.classList.contains('collapsed')) {
    icon.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
  } else {
    icon.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  }
}

function toggleMiniFiltersPanel() {
  const panel = document.getElementById('filters-mini-panel');
  panel.classList.toggle('collapsed');
}

function toggleTaskSearchInput() {
  const input = document.getElementById('task-search-input');
  if (input.style.display === 'none' || input.style.display === '') {
    input.style.display = 'inline-block';
    input.focus();
  } else {
    input.style.display = 'none';
    input.value = '';
    filterTasks();
  }
}

function filterTasks() {
  // Aquí puedes agregar lógica para filtrar las cards de tareas por texto
} 