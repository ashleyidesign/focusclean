// FocusClean App Logic

// Data Structure
const rooms = {
    1: { name: "Kitchen + Dining Room", season: "all" },
    2: { name: "Bedroom + Bathroom", season: "all" },
    3: { name: "Guest Room + Office", season: "all" },
    4: { name: "Living Room + Mud Room", season: "all" },
    5: { name: "Porch + Garden + Yard", season: "spring-summer" }
};

const tasks = {
    daily: [
        { id: 1, text: "Make bed", completed: false },
        { id: 2, text: "Load/start dishwasher", completed: false },
        { id: 3, text: "Wipe down kitchen counters", completed: false },
        { id: 4, text: "10-minute pickup/declutter", completed: false },
        { id: 5, text: "Check mail", completed: false }
    ],
    weekly: [
        { id: 6, text: "Vacuum main living areas", completed: false, day: 1 }, // Monday
        { id: 7, text: "Dust surfaces", completed: false, day: 1 }, // Monday  
        { id: 8, text: "Do laundry", completed: false, day: 2 }, // Tuesday
        { id: 9, text: "Vacuum again (mid-week)", completed: false, day: 4 }, // Thursday
        { id: 10, text: "Focus area deep clean", completed: false, day: 6 }, // Saturday
        { id: 11, text: "Meal prep", completed: false, day: 0 } // Sunday
    ],
    monthly: [
        { id: 12, text: "Clean out car", completed: false, date: 1 },
        { id: 13, text: "Pay bills review", completed: false, date: 15 },
        { id: 14, text: "Deep clean appliances", completed: false, date: 20 },
        { id: 15, text: "Organize one closet", completed: false, date: 25 }
    ],
    quarterly: [
        { id: 16, text: "Clean out basement storage", completed: false },
        { id: 17, text: "Organize garage", completed: false },
        { id: 18, text: "Deep clean carpets", completed: false },
        { id: 19, text: "Check smoke detector batteries", completed: false }
    ],
    yearly: [
        { id: 20, text: "Deep clean windows", completed: false, month: 4 }, // May
        { id: 21, text: "Clean out gutters", completed: false, month: 10 }, // November
        { id: 22, text: "Service HVAC", completed: false, month: 3 }, // April
        { id: 23, text: "Organize tax documents", completed: false, month: 1 } // February
    ],
    focus: {
        1: [ // Kitchen + Dining Room
            { id: 24, text: "Clean out refrigerator", completed: false },
            { id: 25, text: "Organize spice cabinet/pantry", completed: false },
            { id: 26, text: "Deep clean stovetop and oven", completed: false },
            { id: 27, text: "Wipe down dining chairs", completed: false }
        ],
        2: [ // Bedroom + Bathroom
            { id: 28, text: "Organize dresser drawers", completed: false },
            { id: 29, text: "Deep clean bathroom tiles", completed: false },
            { id: 30, text: "Wash bedding and pillows", completed: false },
            { id: 31, text: "Clean out medicine cabinet", completed: false }
        ],
        3: [ // Guest Room + Office
            { id: 32, text: "Organize desk drawers", completed: false },
            { id: 33, text: "Dust electronics and cables", completed: false },
            { id: 34, text: "Fresh linens in guest room", completed: false },
            { id: 35, text: "File important documents", completed: false }
        ],
        4: [ // Living Room + Mud Room
            { id: 35, text: "Deep clean couch cushions", completed: false },
            { id: 36, text: "Organize entertainment center", completed: false },
            { id: 37, text: "Clean light fixtures", completed: false },
            { id: 38, text: "Dust decorative items", completed: false },
            { id: 39, text: "Organize shoes and boots", completed: false },
            { id: 40, text: "Clean out coat pockets", completed: false },
            { id: 41, text: "Organize cleaning supplies", completed: false }
        ],
        5: [ // Porch + Garden + Yard (seasonal)
            { id: 42, text: "Sweep and wash porch", completed: false },
            { id: 43, text: "Clean porch furniture", completed: false },
            { id: 44, text: "Weed garden beds", completed: false },
            { id: 45, text: "Mow lawn", completed: false },
            { id: 46, text: "Trim bushes/hedges", completed: false },
            { id: 47, text: "Water plants", completed: false },
            { id: 48, text: "Check for maintenance needs", completed: false }
        ]
    }
};

// App State
let currentWeek = 1;
let currentDate = new Date();

// Utility Functions
function getCurrentWeekOfYear() {
    const now = new Date();
    // Get Monday of current week
    const monday = new Date(now);
    monday.setDate(now.getDate() - now.getDay() + 1);
    
    // Get Monday of first week of year
    const firstMonday = new Date(now.getFullYear(), 0, 1);
    firstMonday.setDate(1 + (8 - firstMonday.getDay()) % 7);
    
    // Calculate week number
    const diff = monday - firstMonday;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diff / oneWeek) + 1;
}

function getCurrentSeason() {
    const month = new Date().getMonth() + 1; // 1-12
    if (month >= 3 && month <= 8) {
        return "spring-summer";
    }
    return "fall-winter";
}

function getCurrentFocusRoom() {
    const weekOfYear = getCurrentWeekOfYear();
    const season = getCurrentSeason();
    
    // 4-week cycle
    let roomWeek = ((weekOfYear - 1) % 4) + 1;
    
    // Skip outdoor room in fall/winter, cycle through 1-4 instead
    if (roomWeek === 4 && season === "fall-winter") {
        // If it would be outdoor week, pick room 5 (but we only have 1-4 in winter)
        // So we'll extend one of the other weeks or cycle back
        roomWeek = ((weekOfYear - 1) % 3) + 1; // Cycle through 1-3
    }
    
    // For outdoor season, include room 5 in the rotation
    if (season === "spring-summer" && roomWeek === 4) {
        return 5; // Porch + Garden + Yard
    }
    
    return roomWeek;
}

function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function loadProgress() {
    const saved = localStorage.getItem('focusclean-progress');
    if (saved) {
        const progress = JSON.parse(saved);
        const today = new Date().toDateString();
        
        // Only load progress if it's from today
        if (progress.date === today) {
            return progress.tasks || {};
        }
    }
    return {};
}

function saveProgress(taskProgress) {
    const today = new Date().toDateString();
    const progress = {
        date: today,
        tasks: taskProgress
    };
    localStorage.setItem('focusclean-progress', JSON.stringify(progress));
}

// Get today's tasks
function getTodaysTasks() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday
    const dateOfMonth = today.getDate();
    const monthOfYear = today.getMonth() + 1;
    const currentRoom = getCurrentFocusRoom();
    
    let todaysTasks = [];
    
    // Add daily tasks
    tasks.daily.forEach(task => {
        todaysTasks.push({
            ...task,
            type: 'daily',
            isToday: true,
            isFocus: false
        });
    });
    
    // Add weekly tasks for today
    tasks.weekly.forEach(task => {
        if (task.day === dayOfWeek) {
            todaysTasks.push({
                ...task,
                type: 'weekly',
                isToday: true,
                isFocus: false
            });
        }
    });
    
    // Add monthly tasks for today
    tasks.monthly.forEach(task => {
        if (task.date === dateOfMonth) {
            todaysTasks.push({
                ...task,
                type: 'monthly',
                isToday: true,
                isFocus: false
            });
        }
    });
    
    // Add focus room tasks (spread throughout the week)
    if (tasks.focus[currentRoom]) {
        const focusTasks = tasks.focus[currentRoom];
        const tasksPerDay = Math.ceil(focusTasks.length / 7);
        const startIndex = dayOfWeek * tasksPerDay;
        const endIndex = Math.min(startIndex + tasksPerDay, focusTasks.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            if (focusTasks[i]) {
                todaysTasks.push({
                    ...focusTasks[i],
                    type: 'focus',
                    isToday: true,
                    isFocus: true
                });
            }
        }
    }
    
    // Add yearly tasks for this month
    tasks.yearly.forEach(task => {
        if (task.month === monthOfYear) {
            todaysTasks.push({
                ...task,
                type: 'yearly',
                isToday: true,
                isFocus: false
            });
        }
    });
    
    return todaysTasks;
}

// Render functions
function renderTodayView() {
    const currentRoom = getCurrentFocusRoom();
    const todaysTasks = getTodaysTasks();
    const savedProgress = loadProgress();
    
    // Update date
    document.getElementById('current-date').textContent = formatDate(currentDate);
    
    // Update focus room
    document.getElementById('focus-room-name').textContent = rooms[currentRoom].name;
    
    // Update task list
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    todaysTasks.forEach(task => {
        const isCompleted = savedProgress[task.id] || false;
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${isCompleted ? 'completed' : ''}`;
        taskItem.dataset.taskId = task.id;
        taskItem.dataset.isToday = task.isToday;
        taskItem.dataset.isFocus = task.isFocus;
        
        taskItem.innerHTML = `
            <div class="task-checkbox ${isCompleted ? 'checked' : ''}"></div>
            <div class="task-text">${task.text}</div>
        `;
        
        taskItem.addEventListener('click', () => toggleTask(task.id));
        taskList.appendChild(taskItem);
    });
    
    updateProgress();
}

function toggleTask(taskId) {
    const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
    const checkbox = taskItem.querySelector('.task-checkbox');
    const isCompleted = taskItem.classList.contains('completed');
    
    if (isCompleted) {
        taskItem.classList.remove('completed');
        checkbox.classList.remove('checked');
    } else {
        taskItem.classList.add('completed');
        checkbox.classList.add('checked');
    }
    
    // Save progress
    const savedProgress = loadProgress();
    savedProgress[taskId] = !isCompleted;
    saveProgress(savedProgress);
    
    updateProgress();
}

function updateProgress() {
    // Update focus room progress
    const focusTasks = document.querySelectorAll('[data-is-focus="true"]');
    const completedFocus = document.querySelectorAll('[data-is-focus="true"].completed');
    const focusProgress = focusTasks.length > 0 ? (completedFocus.length / focusTasks.length) * 100 : 0;
    document.getElementById('focus-progress').style.width = focusProgress + '%';
    
    // Update today's overall progress
    const todayTasks = document.querySelectorAll('[data-is-today="true"]');
    const completedToday = document.querySelectorAll('[data-is-today="true"].completed');
    const todayProgress = todayTasks.length > 0 ? (completedToday.length / todayTasks.length) * 100 : 0;
    document.getElementById('today-progress').style.width = todayProgress + '%';
    
    // Update task count (remaining tasks)
    const remainingTasks = todayTasks.length - completedToday.length;
    document.getElementById('task-count').textContent = remainingTasks;
}

// Navigation
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;
            
            // Update active nav
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Handle page switching (placeholder for now)
            if (page === 'today') {
                renderTodayView();
            } else {
                console.log(`Navigate to ${page} page`);
                // TODO: Implement other pages
            }
        });
    });
}

// Initialize app
function init() {
    renderTodayView();
    initNavigation();
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);