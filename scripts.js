
let currentIndex = 0;   

const items = document.querySelectorAll('.carousel-item');

function showItem(index) {
    const totalItems = items.length;

    currentIndex = (index + totalItems) % totalItems;

    const offset = -currentIndex * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

document.getElementById('prevButton').addEventListener('click', () => {
    showItem(currentIndex - 1);
});

document.getElementById('nextButton').addEventListener('click', () => {
    showItem(currentIndex + 1);
});

showItem(currentIndex);


let isDay = true;

function changeBackgroundColor() {
    if (isDay) {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
    } else {
        document.body.style.backgroundColor = '#2e2e2e'; 
        document.body.style.color = '#ffffff'; 
    }
    isDay = !isDay; 
}

document.getElementById('toggleTheme').addEventListener('click', changeBackgroundColor);


function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('en-US');
    document.getElementById('dateTime').textContent = `${formattedDate}, ${formattedTime}`;
}
setInterval(updateDateTime, 1000);

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerHTML = ''; 

    if (!email.includes('@')) {
        errorMessage.innerHTML = 'Please enter a valid email address';
        e.preventDefault();
    }
});

function addTask() {
    const taskText = document.getElementById('newTask').value;
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = taskText;
    li.classList.add('list-group-item');
    taskList.appendChild(li);
}

function sortNumbers(order) {
    const numbers = document.getElementById('numbers').value.split(',').map(Number);
    if (numbers.some(isNaN)) {
        alert('Please enter valid numbers');
        return;
    }
    const sortedNumbers = numbers.sort((a, b) => (order === 'asc' ? a - b : b - a));
    document.getElementById('sortedOutput').textContent = sortedNumbers.join(', ');
}
function updateGreeting() {
    const nameInput = document.querySelector('#nameInput').value;
    const greeting = nameInput ? `Hello, ${nameInput}!` : 'Hello!';
    document.querySelector('#greeting').textContent = greeting;
}

function validateContactForm(e) {
    e.preventDefault();
    
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#name').value;
    const errorMessage = document.querySelector('#error-message');
    const successMessage = document.querySelector('#success-message');
    
    errorMessage.textContent = '';
    successMessage.textContent = '';

    const emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const nameValid = name.trim().length > 0;
    
    if (!nameValid || !emailValid) {
        errorMessage.textContent = 'Please provide a valid name and email.';
    } else {
        successMessage.textContent = 'Form submitted successfully!';
        document.querySelector('#contactForm').reset(); 
    }
}


document.querySelector('#bgColorButton').addEventListener('click', changeBackgroundColor);
document.querySelector('#updateGreetingButton').addEventListener('click', updateGreeting);
document.querySelector('#contactForm')?.addEventListener('submit', validateContactForm);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        changeBackgroundColor();
    }
});

document.getElementById('bgColorButton').addEventListener('click', function(){
    const audio = new Audio('click.mp3')
    audio.play();
});
// scripts.js
function saveThemeToLocalStorage() {
    localStorage.setItem('theme', isDay ? 'day' : 'night');
}

function loadThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
        isDay = false;
        changeBackgroundColor();
    }
}

document.getElementById('toggleTheme').addEventListener('click', () => {
    changeBackgroundColor();
    saveThemeToLocalStorage();
});

window.onload = () => {
    loadThemeFromLocalStorage();
    updateDateTime();
};

// Saving tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('#taskList li')).map(task => task.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = task;
        document.getElementById('taskList').appendChild(li);
    });
}

function addTask() {
    const taskText = document.getElementById('newTask').value;
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = taskText;
    taskList.appendChild(li);
    saveTasksToLocalStorage();
    document.getElementById('newTask').value = ''; // Clear input field
}

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
