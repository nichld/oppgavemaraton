require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const helloRoutes = require('./routes/helloRoutes');
const redirectRoutes = require('./routes/redirectRoutes');
const userRoutes = require('./routes/userRoutes');
const indexController = require('./controllers/indexController');
const mongoController = require('./controllers/mongoController');
const userController = require('./controllers/userController');
const galleryController = require('./controllers/galleryController');
const { isAuthenticated } = require('./middleware/auth');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/index');
  });
});

mongoose.connect('mongodb://10.12.7.252:27017/dagsoppgave', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', helloRoutes);
app.use('/', redirectRoutes);
app.use('/', userRoutes);

app.get('/index', indexController.getIndex);
app.post('/login', userController.login);
app.post('/register', userController.register);

app.get('/mongo-world', mongoController.getMongoWorld);

app.get('/galleri', isAuthenticated, galleryController.getGallery);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});