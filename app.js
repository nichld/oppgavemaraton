const express = require('express');
const mongoose = require('mongoose');
const app = express();
const helloRoutes = require('./routes/helloRoutes');
const redirectRoutes = require('./routes/redirectRoutes');
const indexController = require('./controllers/indexController');
const mongoController = require('./controllers/mongoController');

app.set('view engine', 'ejs');

mongoose.connect('mongodb://10.12.7.252:27017/mongo-world', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', helloRoutes);
app.use('/', redirectRoutes);

app.get('/index', indexController.getIndex);

app.get('/mongo-world', mongoController.getMongoWorld);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});