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
        { id: 16, text: "Sweep garage floors", completed: false },
        { id: 17, text: "Organize garage tools/gear", completed: false },
        { id: 18, text: "Blow out garage dust/cobwebs", completed: false },
        { id: 19, text: "Vacuum or mop basement floor", completed: false },
        { id: 20, text: "Disinfect gym equipment", completed: false },
        { id: 21, text: "Declutter basement shelves or gear bins", completed: false },
        { id: 22, text: "Deep clean carpets", completed: false },
        { id: 23, text: "Check smoke detector batteries", completed: false }
    ],
    yearly: [
        { id: 20, text: "Deep clean windows", completed: false, month: 4 }, // May
        { id: 21, text: "Clean out gutters", completed: false, month: 10 }, // November
        { id: 22, text: "Service HVAC", completed: false, month: 3 }, // April
        { id: 23, text: "Organize tax documents", completed: false, month: 1 } // February
    ],
    focus: {
        1: [ // Kitchen + Dining Room
            { id: 24, text: "Wipe down counters and appliances", completed: false },
            { id: 25, text: "Clean sink and faucet", completed: false },
            { id: 26, text: "Clean out fridge", completed: false },
            { id: 27, text: "Clean inside microwave", completed: false },
            { id: 28, text: "Wipe cabinets and handles", completed: false },
            { id: 29, text: "Organize pantry or drawers", completed: false },
            { id: 30, text: "Wipe down dining table and chairs", completed: false },
            { id: 31, text: "Shake out or vacuum dining rug", completed: false },
            { id: 32, text: "Clean dining light fixture", completed: false },
            { id: 33, text: "Dust surfaces or hutch", completed: false }
        ],
        2: [ // Bedroom + Bathroom
            { id: 34, text: "Change bedding", completed: false },
            { id: 35, text: "Dust surfaces and lamps", completed: false },
            { id: 36, text: "Declutter nightstands", completed: false },
            { id: 37, text: "Organize closet or drawers", completed: false },
            { id: 38, text: "Clean bedroom mirror and windows", completed: false },
            { id: 39, text: "Scrub toilet, sink, and shower", completed: false },
            { id: 40, text: "Clean bathroom mirror and fixtures", completed: false },
            { id: 41, text: "Wipe washer/dryer", completed: false },
            { id: 42, text: "Wash bath mats and towels", completed: false },
            { id: 43, text: "Clean grout and baseboards", completed: false }
        ],
        3: [ // Guest Room + Office
            { id: 44, text: "Dust office desk, monitor, and shelves", completed: false },
            { id: 45, text: "Empty office trash/recycling", completed: false },
            { id: 46, text: "Wipe down electronics", completed: false },
            { id: 47, text: "Declutter desk drawers or paper piles", completed: false },
            { id: 48, text: "Vacuum guest room rug and under bed", completed: false },
            { id: 49, text: "Dust guest room surfaces and décor", completed: false },
            { id: 50, text: "Wash guest bedding", completed: false },
            { id: 51, text: "Clean guest room windows and blinds", completed: false },
            { id: 52, text: "Declutter guest closet or drawers", completed: false }
        ],
        4: [ // Living Room + Mud Room
            { id: 53, text: "Vacuum living room rug and couch", completed: false },
            { id: 54, text: "Dust electronics, TV, and surfaces", completed: false },
            { id: 55, text: "Wipe down remotes and switches", completed: false },
            { id: 56, text: "Fluff and rotate cushions", completed: false },
            { id: 57, text: "Clean living room windows and sills", completed: false },
            { id: 58, text: "Organize books/magazines", completed: false },
            { id: 59, text: "Wipe mud room table and surfaces", completed: false },
            { id: 60, text: "Organize shoes/jackets", completed: false },
            { id: 61, text: "Clean mud room mirror or wall hooks", completed: false },
            { id: 62, text: "Dust mud room displays/shelves", completed: false },
            { id: 63, text: "Vacuum mud room closet floor", completed: false }
        ],
        5: [ // Porch + Garden + Yard (seasonal)
            { id: 64, text: "Sweep porch floor and steps", completed: false },
            { id: 65, text: "Wipe down door and trim", completed: false },
            { id: 66, text: "Clean porch light fixtures", completed: false },
            { id: 67, text: "Shake out or vacuum mat", completed: false },
            { id: 68, text: "Dust porch shelves, décor, or railings", completed: false },
            { id: 69, text: "Wash storm door or windows", completed: false },
            { id: 70, text: "Pull weeds from garden", completed: false },
            { id: 71, text: "Trim dead/damaged plant material", completed: false },
            { id: 72, text: "Sweep or edge garden borders", completed: false },
            { id: 73, text: "Clean/adjust garden decor or solar lights", completed: false },
            { id: 74, text: "Pick up sticks/debris from yard", completed: false },
            { id: 75, text: "Hose down or clean outdoor furniture", completed: false },
            { id: 76, text: "Organize/clean grill or fire pit", completed: false },
            { id: 77, text: "Clean siding or windows at eye level", completed: false }
        ]
    }
};

// Speed Clean Data
const speedCleanTasks = {
    30: [ // 30 minutes - the essentials
        { id: 'sc1', text: '10-minute pickup/declutter main areas', completed: false },
        { id: 'sc2', text: 'Take out visible trash', completed: false },
        { id: 'sc3', text: 'Wipe down kitchen counters and sink', completed: false },
        { id: 'sc4', text: 'Quick clean guest bathroom (toilet, sink, mirror)', completed: false },
        { id: 'sc5', text: 'Clear and wipe dining table', completed: false },
        { id: 'sc6', text: 'Fluff couch cushions and fold throws', completed: false },
        { id: 'sc7', text: 'Load dishwasher or hide dirty dishes', completed: false }
    ],
    60: [ // 1 hour - more thorough
        { id: 'sc8', text: '15-minute pickup/declutter main areas', completed: false },
        { id: 'sc9', text: 'Vacuum/sweep visible floors', completed: false },
        { id: 'sc10', text: 'Wipe down kitchen counters, sink, and appliances', completed: false },
        { id: 'sc11', text: 'Clean guest bathroom thoroughly', completed: false },
        { id: 'sc12', text: 'Dust coffee table and TV stand', completed: false },
        { id: 'sc13', text: 'Clear and wipe all visible surfaces', completed: false },
        { id: 'sc14', text: 'Make beds and fluff pillows', completed: false },
        { id: 'sc15', text: 'Take out all trash and recycling', completed: false },
        { id: 'sc16', text: 'Quick mop kitchen and bathroom floors', completed: false },
        { id: 'sc17', text: 'Ensure fresh guest towels are out', completed: false }
    ],
    120: [ // 2 hours - really impressive
        { id: 'sc18', text: '20-minute deep declutter all main areas', completed: false },
        { id: 'sc19', text: 'Vacuum all floors and rugs', completed: false },
        { id: 'sc20', text: 'Deep clean kitchen (counters, sink, appliances, floor)', completed: false },
        { id: 'sc21', text: 'Thoroughly clean both bathrooms', completed: false },
        { id: 'sc22', text: 'Dust all visible surfaces and electronics', completed: false },
        { id: 'sc23', text: 'Clean all mirrors and windows', completed: false },
        { id: 'sc24', text: 'Organize and style living areas', completed: false },
        { id: 'sc25', text: 'Fresh linens on guest bed', completed: false },
        { id: 'sc26', text: 'Mop all hard floors', completed: false },
        { id: 'sc27', text: 'Light candles or air freshener', completed: false },
        { id: 'sc28', text: 'Quick tidy of mud room and entryway', completed: false },
        { id: 'sc29', text: 'Wipe down light switches and door handles', completed: false }
    ]
};

// Speed Clean Functions
function showSpeedClean() {
    let modal = document.getElementById('speed-clean-modal');
    if (!modal) {
        modal = createSpeedCleanModal();
        document.body.appendChild(modal);
    }
    
    // Reset to 30 minutes by default
    selectTimeOption(30);
    modal.classList.add('active');
}

function createSpeedCleanModal() {
    const modal = document.createElement('div');
    modal.id = 'speed-clean-modal';
    modal.className = 'speed-clean-modal';
    
    modal.innerHTML = `
        <div class="speed-clean-content">
            <div class="speed-clean-header">
                <h2 class="speed-clean-title">⚡ Speed Clean</h2>
                <p class="speed-clean-subtitle-modal">High-impact tasks for unexpected guests</p>
            </div>
            
            <div class="time-selector">
                <p style="margin: 0 0 10px 0; font-weight: 600;">How much time do you have?</p>
                <div class="time-options">
                    <div class="time-option" data-time="30" onclick="selectTimeOption(30)">30 min</div>
                    <div class="time-option" data-time="60" onclick="selectTimeOption(60)">1 hour</div>
                    <div class="time-option" data-time="120" onclick="selectTimeOption(120)">2 hours</div>
                </div>
            </div>
            
            <div class="speed-tasks-container" id="speed-tasks-container">
                <!-- Tasks will be populated here -->
            </div>
            
            <div class="speed-clean-footer">
                <button class="close-speed-btn" onclick="closeSpeedClean()">Done</button>
            </div>
        </div>
    `;
    
    return modal;
}

function selectTimeOption(minutes) {
    // Update visual selection
    document.querySelectorAll('.time-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`[data-time="${minutes}"]`).classList.add('selected');
    
    // Load tasks for selected time
    loadSpeedCleanTasks(minutes);
}

function loadSpeedCleanTasks(minutes) {
    const container = document.getElementById('speed-tasks-container');
    container.innerHTML = '';
    
    const tasks = speedCleanTasks[minutes] || [];
    
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'speed-task-item';
        taskItem.dataset.taskId = task.id;
        
        taskItem.innerHTML = `
            <div class="speed-checkbox" onclick="toggleSpeedTask('${task.id}')"></div>
            <div class="speed-task-text">${task.text}</div>
        `;
        
        container.appendChild(taskItem);
    });
}

function toggleSpeedTask(taskId) {
    const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
    const checkbox = taskItem.querySelector('.speed-checkbox');
    const isCompleted = taskItem.classList.contains('completed');
    
    if (isCompleted) {
        taskItem.classList.remove('completed');
        checkbox.classList.remove('checked');
    } else {
        taskItem.classList.add('completed');
        checkbox.classList.add('checked');
    }
}

function closeSpeedClean() {
    const modal = document.getElementById('speed-clean-modal');
    if (modal) modal.classList.remove('active');
}

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
    
    // Check if all tasks are completed and trigger celebration
    if (todayTasks.length > 0 && remainingTasks === 0) {
        triggerCelebration();
    }
}

function triggerCelebration() {
    // Create celebration overlay
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    
    // Create confetti
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        celebration.appendChild(confetti);
    }
    
    // Create celebration message
    const message = document.createElement('div');
    message.className = 'celebration-message';
    message.innerHTML = '🎉<br>All Done!<br>Great Job! 🎉';
    
    // Add to page
    document.body.appendChild(celebration);
    document.body.appendChild(message);
    
    // Remove after animation
    setTimeout(() => {
        message.classList.add('fade-out');
        setTimeout(() => {
            if (celebration.parentNode) celebration.parentNode.removeChild(celebration);
            if (message.parentNode) message.parentNode.removeChild(message);
        }, 500);
    }, 2500);
}

// Navigation
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;
            
            // Update active nav
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all views
            document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
            
            // Show selected view
            if (page === 'today') {
                document.getElementById('today-view').classList.add('active');
                renderTodayView();
            } else if (page === 'tasks') {
                document.getElementById('tasks-view').classList.add('active');
                renderTasksView();
            } else if (page === 'schedule') {
                document.getElementById('schedule-view').classList.add('active');
            } else if (page === 'settings') {
                document.getElementById('settings-view').classList.add('active');
            }
        });
    });
}

// Task Management Functions
function renderTasksView() {
    renderTaskCategory('daily');
    renderTaskCategory('weekly');
    renderTaskCategory('monthly');
    renderFocusRoomTasks();
    initTaskManagement();
}

function renderTaskCategory(category) {
    const container = document.getElementById(`${category}-tasks`);
    container.innerHTML = '';
    
    tasks[category].forEach(task => {
        const taskItem = createTaskManagementItem(task, category);
        container.appendChild(taskItem);
    });
}

function renderFocusRoomTasks() {
    const roomSelect = document.getElementById('focus-room-select');
    const selectedRoom = parseInt(roomSelect.value) || 1;
    const container = document.getElementById('focus-tasks');
    container.innerHTML = '';
    
    if (tasks.focus[selectedRoom]) {
        tasks.focus[selectedRoom].forEach(task => {
            const taskItem = createTaskManagementItem(task, 'focus', selectedRoom);
            container.appendChild(taskItem);
        });
    }
}

function createTaskManagementItem(task, category, roomId = null) {
    const item = document.createElement('div');
    item.className = 'task-management-item';
    item.dataset.taskId = task.id;
    item.dataset.category = category;
    if (roomId) item.dataset.roomId = roomId;
    
    let scheduleText = '';
    if (category === 'weekly' && task.day !== undefined) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        scheduleText = `Every ${days[task.day]}`;
    } else if (category === 'monthly' && task.date) {
        scheduleText = `On the ${task.date}${getOrdinalSuffix(task.date)} of each month`;
    } else if (category === 'yearly' && task.month) {
        const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        scheduleText = `Every ${months[task.month]}`;
    } else if (category === 'daily') {
        scheduleText = 'Every day';
    } else if (category === 'focus') {
        scheduleText = 'During focus week';
    }
    
    item.innerHTML = `
        <div class="task-content">
            <div class="task-management-text">${task.text}</div>
            <div class="task-schedule">${scheduleText}</div>
        </div>
        <div class="task-actions">
            <button class="edit-btn" onclick="editTask(${task.id}, '${category}', ${roomId})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${task.id}, '${category}', ${roomId})">Delete</button>
        </div>
    `;
    
    return item;
}

function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function initTaskManagement() {
    // Room selection change
    document.getElementById('focus-room-select').addEventListener('change', renderFocusRoomTasks);
    
    // Add task buttons
    document.querySelectorAll('.add-task-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            const roomId = category === 'focus' ? parseInt(document.getElementById('focus-room-select').value) : null;
            showTaskModal('add', category, null, roomId);
        });
    });
}

// Modal functions
function showTaskModal(mode, category, taskId = null, roomId = null) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('task-modal');
    if (!modal) {
        modal = createTaskModal();
        document.body.appendChild(modal);
    }
    
    const isEdit = mode === 'edit';
    const task = isEdit ? findTask(taskId, category, roomId) : null;
    
    // Update modal content
    document.getElementById('modal-title').textContent = isEdit ? 'Edit Task' : 'Add New Task';
    document.getElementById('task-text-input').value = task ? task.text : '';
    
    // Show/hide schedule fields based on category
    updateScheduleFields(category, task);
    
    // Store modal state
    modal.dataset.mode = mode;
    modal.dataset.category = category;
    modal.dataset.taskId = taskId;
    modal.dataset.roomId = roomId;
    
    modal.classList.add('active');
}

function createTaskModal() {
    const modal = document.createElement('div');
    modal.id = 'task-modal';
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header" id="modal-title">Add New Task</div>
            <div class="form-group">
                <label class="form-label" for="task-text-input">Task Description</label>
                <input type="text" id="task-text-input" class="form-input" placeholder="Enter task description">
            </div>
            <div id="schedule-fields"></div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="closeTaskModal()">Cancel</button>
                <button class="btn-primary" onclick="saveTask()">Save</button>
            </div>
        </div>
    `;
    
    return modal;
}

function updateScheduleFields(category, task = null) {
    const container = document.getElementById('schedule-fields');
    container.innerHTML = '';
    
    if (category === 'weekly') {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        container.innerHTML = `
            <div class="form-group">
                <label class="form-label" for="day-select">Day of Week</label>
                <select id="day-select" class="form-select">
                    ${days.map((day, index) => 
                        `<option value="${index}" ${task && task.day === index ? 'selected' : ''}>${day}</option>`
                    ).join('')}
                </select>
            </div>
        `;
    } else if (category === 'monthly') {
        container.innerHTML = `
            <div class="form-group">
                <label class="form-label" for="date-input">Date of Month</label>
                <input type="number" id="date-input" class="form-input" min="1" max="31" 
                       value="${task ? task.date : 1}" placeholder="1-31">
            </div>
        `;
    } else if (category === 'yearly') {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
        container.innerHTML = `
            <div class="form-group">
                <label class="form-label" for="month-select">Month</label>
                <select id="month-select" class="form-select">
                    ${months.map((month, index) => 
                        `<option value="${index + 1}" ${task && task.month === index + 1 ? 'selected' : ''}>${month}</option>`
                    ).join('')}
                </select>
            </div>
        `;
    }
}

function findTask(taskId, category, roomId = null) {
    if (category === 'focus' && roomId) {
        return tasks.focus[roomId]?.find(task => task.id === taskId);
    }
    return tasks[category]?.find(task => task.id === taskId);
}

function saveTask() {
    const modal = document.getElementById('task-modal');
    const mode = modal.dataset.mode;
    const category = modal.dataset.category;
    const taskId = parseInt(modal.dataset.taskId);
    const roomId = modal.dataset.roomId ? parseInt(modal.dataset.roomId) : null;
    
    const text = document.getElementById('task-text-input').value.trim();
    if (!text) {
        alert('Please enter a task description');
        return;
    }
    
    const taskData = { text, completed: false };
    
    // Add schedule data based on category
    if (category === 'weekly') {
        taskData.day = parseInt(document.getElementById('day-select').value);
    } else if (category === 'monthly') {
        taskData.date = parseInt(document.getElementById('date-input').value);
    } else if (category === 'yearly') {
        taskData.month = parseInt(document.getElementById('month-select').value);
    }
    
    if (mode === 'edit') {
        // Update existing task
        const task = findTask(taskId, category, roomId);
        if (task) {
            Object.assign(task, taskData);
        }
    } else {
        // Add new task
        taskData.id = generateTaskId();
        
        if (category === 'focus' && roomId) {
            if (!tasks.focus[roomId]) tasks.focus[roomId] = [];
            tasks.focus[roomId].push(taskData);
        } else {
            tasks[category].push(taskData);
        }
    }
    
    saveTasksToStorage();
    renderTasksView();
    closeTaskModal();
}

function deleteTask(taskId, category, roomId = null) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    if (category === 'focus' && roomId && tasks.focus[roomId]) {
        tasks.focus[roomId] = tasks.focus[roomId].filter(task => task.id !== taskId);
    } else if (tasks[category]) {
        tasks[category] = tasks[category].filter(task => task.id !== taskId);
    }
    
    saveTasksToStorage();
    renderTasksView();
}

function editTask(taskId, category, roomId = null) {
    showTaskModal('edit', category, taskId, roomId);
}

function closeTaskModal() {
    const modal = document.getElementById('task-modal');
    if (modal) modal.classList.remove('active');
}

function generateTaskId() {
    // Simple ID generation - find the highest existing ID and add 1
    let maxId = 0;
    
    ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'].forEach(category => {
        tasks[category].forEach(task => {
            if (task.id > maxId) maxId = task.id;
        });
    });
    
    Object.values(tasks.focus).forEach(roomTasks => {
        roomTasks.forEach(task => {
            if (task.id > maxId) maxId = task.id;
        });
    });
    
    return maxId + 1;
}

function saveTasksToStorage() {
    localStorage.setItem('focusclean-tasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    const saved = localStorage.getItem('focusclean-tasks');
    if (saved) {
        const savedTasks = JSON.parse(saved);
        // Merge with defaults to ensure all categories exist
        Object.assign(tasks, savedTasks);
    }
}

// Initialize app
function init() {
    loadTasksFromStorage();
    renderTodayView();
    initNavigation();
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);