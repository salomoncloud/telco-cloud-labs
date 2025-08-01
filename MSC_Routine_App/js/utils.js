// Format a timestamp into a human-readable relative time (e.g., "2 hours ago")
function formatTime(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now - time;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays > 0) {
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else if (diffMinutes > 0) {
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  } else {
    return 'just now';
  }
}

// Confirm closure of a task in 'closing' state: moves it to closedTasks array
function confirmClosure(taskId) {
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    const closedTask = tasks.splice(index, 1)[0];
    closedTask.status = 'closed';
    closedTasks.push(closedTask);
    // (In a real app, mark this task as closed/archived in the database)
    return true;
  }
  return false;
}
