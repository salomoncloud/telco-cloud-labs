// Mock task data (to be replaced with Firestore data in the future)
const tasks = [
  {
    id: '1',
    description: 'SSD Degraded - requires immediate attention',
    status: 'new',
    site: 'Cote De Liesse',
    createdBy: 'Jean.Francois.Mongrain@ericsson.com',
    createdAt: '2 hours ago',
    tags: ['Core', 'HLR-5'],
    priority: 'high'
  },
  {
    id: '2',
    description: 'Rack 15 cable management cleanup in progress',
    status: 'progress',
    site: 'Place Bonaventure',
    createdBy: 'Mario.Castro@ericsson.com',
    createdAt: '1 day ago',
    tags: ['MMR', 'Rack 15'],
    priority: 'medium'
  },
  {
    id: '3',
    description: 'UPS battery test completed successfully',
    status: 'closing',
    site: 'Bridge',
    createdBy: 'Leopold.Atemkeng.Temgoua@ericsson.com',
    createdAt: '3 hours ago',
    tags: ['Power', 'UPS'],
    priority: 'low'
  },
  {
    id: '4',
    description: 'Server room humidity levels outside normal range',
    status: 'new',
    site: 'Notre-Dame',
    createdBy: 'Salomon.Lubin@ericsson.com',
    createdAt: '5 hours ago',
    tags: ['HVAC', 'MMR'],
    priority: 'high'
  }
];

// Array to hold closed tasks (simulating archived/deleted tasks)
const closedTasks = [];

// Status configuration for task badges and icons
const statusConfig = {
  new: {
    color: 'text-status-new',
    bg: 'bg-red-100',
    icon: 'fas fa-exclamation-triangle',
    text: 'New'
  },
  progress: {
    color: 'text-status-progress',
    bg: 'bg-orange-100',
    icon: 'fas fa-clock',
    text: 'In Progress'
  },
  closing: {
    color: 'text-status-closing',
    bg: 'bg-green-100',
    icon: 'fas fa-check-circle',
    text: 'Closing'
  }
};

// Add a new task (currently adds to local array; future: send to Firestore)
function addTask(task) {
  // For now, simply push to the tasks array
  tasks.push(task);
  // (In future, generate a unique ID or use Firestore auto-ID, then update UI)
}

// Update an existing task (find by id and merge changes)
function updateTask(id, updatedData) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedData };
    // In a real app, also update the task in Firestore
  }
}
