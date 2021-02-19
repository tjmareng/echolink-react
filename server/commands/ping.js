const { generateMessage } = require('../utils/messages');

exports.run = (io, user, message) => {
    io.to(user.room).emit('message', generateMessage('Cassy', 'Pong'));
}
config: {}