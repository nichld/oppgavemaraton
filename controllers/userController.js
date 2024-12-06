const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      res.send('Login successful');
    } else {
      res.send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};