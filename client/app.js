//Selectors
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

//Global variables
let userName = '';

//Listeners
loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);

function login(event) {
    event.preventDefault();

    if (userNameInput.value.trim() === '') {
        alert('Please enter your name.');
    } else {
        userName = userNameInput.value;

        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
}

function sendMessage(event) {
    event.preventDefault();

    const messageContent = messageContentInput.value.trim();
    if (messageContent === '') {
        alert('Please type a message.');
    } else {
        addMessage(userName, messageContent);
        messageContentInput.value = '';
    }
}

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message', 'message--received');
    if (author === userName) {
        message.classList.add('message--self');
    }

    message.innerHTML = `
        <h3 class="message__author">${author === userName ? 'You' : author}</h3>
        <div class="message__content">${content}</div>
    `;
    messagesList.appendChild(message);
}