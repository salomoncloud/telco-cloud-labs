// Create HTML for a single task card (including status badge and tags)
function createTaskCard(task) {
  const config = statusConfig[task.status];
  const priorityColor = 
    task.priority === 'high' ? 'border-l-red-500' :
    (task.priority === 'medium' ? 'border-l-orange-500' : 'border-l-green-500');

  // If task is ready to close, include a "Confirm Closure" button
  let confirmButtonHTML = '';
  if (task.status === 'closing') {
    confirmButtonHTML = `
      <div class="mt-3 text-right">
        <button class="confirm-closure-btn bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-green-700 transition-colors" data-id="${task.id}">
          Confirm Closure
        </button>
      </div>
    `;
  }

  return `
    <div class="task-card-hover bg-white border-l-4 ${priorityColor} rounded-r-lg border border-gray-200 p-5 mb-4 cursor-pointer">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center space-x-2">
          <span class="status-badge px-3 py-1 rounded-full ${config.bg} ${config.color} flex items-center space-x-1">
            <i class="${config.icon} text-xs"></i>
            <span>${config.text}</span>
          </span>
        </div>
        <span class="text-xs text-gray-500">${task.createdAt}</span>
      </div>
      <h3 class="font-semibold text-gray-900 mb-3 leading-relaxed">${task.description}</h3>
      <div class="flex items-center space-x-4 mb-3 text-sm text-gray-600">
        <div class="flex items-center space-x-1">
          <i class="fas fa-map-marker-alt text-xs"></i>
          <span>${task.site}</span>
        </div>
        <div class="flex items-center space-x-1">
          <i class="fas fa-user text-xs"></i>
          <span>${task.createdBy.split('@')[0]}</span>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        ${task.tags.map(tag => `
          <span class="px-2 py-1 bg-ericsson-light-grey text-ericsson-blue text-xs font-semibold rounded-md uppercase tracking-wide">
            ${tag}
          </span>
        `).join('')}
      </div>
      ${confirmButtonHTML}
    </div>
  `;
}

// Render the task feed (or show empty state if no tasks)
function renderTasks(taskList = tasks) {
  const taskFeed = document.getElementById('taskFeed');
  const emptyStateTemplate = document.getElementById('emptyState');
  if (taskList.length === 0) {
    taskFeed.innerHTML = '';
    const emptyClone = emptyStateTemplate.cloneNode(true);
    emptyClone.classList.remove('hidden');
    taskFeed.appendChild(emptyClone);
  } else {
    taskFeed.innerHTML = taskList.map(task => createTaskCard(task)).join('');
  }
}

// Filter tasks based on selected site and date range
function filterTasks() {
  const siteValue = document.getElementById('siteFilter').value;
  const dateValue = document.getElementById('dateFilter').value;
  let filteredTasks = tasks;
  // Filter by site (if not "all")
  if (siteValue !== 'all') {
    filteredTasks = filteredTasks.filter(task => {
      const normalizedSite = task.site.toLowerCase().replace(/\s+/g, '-');
      return normalizedSite === siteValue;
    });
  }
  // Filter by date (simple check: "today" for demo purposes)
  if (dateValue === 'today') {
    filteredTasks = filteredTasks.filter(task =>
      task.createdAt.includes('hour') || task.createdAt.includes('minute')
    );
  }
  renderTasks(filteredTasks);
}
