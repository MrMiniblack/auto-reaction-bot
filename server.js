const express = require('express');
const { loadBots } = require('./bot');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await loadBots();
});
