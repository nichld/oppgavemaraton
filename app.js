const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const helloRoutes = require('./routes/helloRoutes');
const redirectRoutes = require('./routes/redirectRoutes');
const indexController = require('./controllers/indexController');
const mongoController = require('./controllers/mongoController');
const userController = require('./controllers/userController');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://10.12.7.252:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', helloRoutes);
app.use('/', redirectRoutes);

app.get('/index', indexController.getIndex);
app.post('/login', userController.login);
app.post('/register', userController.register);

app.get('/mongo-world', mongoController.getMongoWorld);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});