const express = require('express');
const { loadBots } = require('./src/bot');
const routes = require('./src/routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  loadBots();
});
