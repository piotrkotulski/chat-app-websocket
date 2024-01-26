const express = require('express');
const path = require('path');
const socket = require('socket.io');
const app = express();
const port = 8000;

const messages = [];
let users = [];

app.use(express.static(path.join(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const server = app.listen(port, () => {
    console.log('Server is running on Port:', port)
});
const io = socket(server);

io.on('connection', (socket) => {
    socket.on('join', (userName) => {
        users.push({name: userName, id: socket.id});
        socket.broadcast.emit('newUser', `${userName} has joined the conversation!`);
    });

    socket.on('message', (message) => {
        messages.push(message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        const userLeaving = users.find(user => user.id === socket.id);
        if (userLeaving) {
            io.emit('removeUser', `${userLeaving.name} has left the conversation... :(`);
            users = users.filter(user => user.id !== socket.id);
        }
    });
});

