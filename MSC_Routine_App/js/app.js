// Main application logic: initialize modules and attach event handlers
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize dashboard logic if on the dashboard page (index.html)
  const taskFeedEl = document.getElementById('taskFeed');
  if (taskFeedEl) {
    // Initial render of tasks
    renderTasks();
    // Filter dropdown change events
    document.getElementById('siteFilter').addEventListener('change', filterTasks);
    document.getElementById('dateFilter').addEventListener('change', filterTasks);

    // Task card click events (including Confirm Closure button)
    taskFeedEl.addEventListener('click', (e) => {
      const confirmBtn = e.target.closest('.confirm-closure-btn');
      if (confirmBtn) {
        const taskId = confirmBtn.getAttribute('data-id');
        confirmClosure(taskId);
        // Re-apply current filters after closing a task
        filterTasks();
        e.stopPropagation();
        return;
      }
      const taskCard = e.target.closest('.task-card-hover');
      if (taskCard) {
        console.log('Navigate to task detail');
        // Future: navigate to task-detail page or open detail modal
      }
    });

    // "Add Task" button and Floating Action Button events
    document.getElementById('addTaskBtn').addEventListener('click', () => {
      console.log('Open add task form');
      // Future: route to task-detail.html (task creation form)
    });
    document.querySelector('.fab').addEventListener('click', () => {
      console.log('Open add task form');
      // Same action as above, for convenience on mobile/any screen
    });

    // Fade-in effect for main content
    document.querySelector('main').classList.add('fade-in');

    // Simulate real-time updates: periodically pulse a random task card
    setInterval(() => {
      const cards = document.querySelectorAll('.task-card-hover');
      if (cards.length > 0) {
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        randomCard.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => { randomCard.style.animation = ''; }, 1000);
      }
    }, 10000);
  }
});
