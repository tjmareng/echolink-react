const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');
const config = require('./json/config');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3001;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', generateMessage('Cassy', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Cassy', `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        console.log('SENT')
        if (filter.isProfane(message)) {
            io.to(user.room).emit('message', generateMessage('Cassy', 'Profanity will not be tolerated!'));
            return callback('Profanity is not allowed!')
        }

        if (message.startsWith(config.prefix)) {

            // Remove '!' from command
            const args = message.slice(config.prefix.length).trim().split(/ + /g);

            // Change command to lower case (i.e. !pInG = !ping)
            const command = args.shift().toLowerCase().split(" ")[0];

            // Search and run command
            let commandFile = require(`./commands/${command}`);
            commandFile.run(io, user, message);
            
            return callback('command');
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', generateMessage('Cassy', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});



