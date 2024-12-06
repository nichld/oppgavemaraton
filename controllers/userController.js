// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = user;
      res.redirect('/galleri');
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
    req.session.user = newUser;
    res.redirect('/galleri');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username isAdmin');
    res.render('users', { users });
  } catch (error) {
    res.status(500).send('Error retrieving users');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
};

exports.upgradeUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isAdmin: true });
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Error upgrading user');
  }
};