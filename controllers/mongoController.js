const Message = require('../models/Message');

exports.getMongoWorld = async (req, res) => {
  try {
    const messages = await Message.find({}).select('message -_id');
    const filteredMessages = messages.filter(message => message.message);
    res.render('mongo', { messages: filteredMessages });
  } catch (error) {
    res.status(500).send('Error retrieving messages');
  }
};