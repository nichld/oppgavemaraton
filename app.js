const express = require('express');
const app = express();
const helloRoutes = require('./routes/helloRoutes');
const redirectRoutes = require('./routes/redirectRoutes');

app.use('/api', helloRoutes);
app.use('/', redirectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});