const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: String
});

module.exports = mongoose.model('Message', messageSchema, 'greetings');