const express = require('express');
const { addBot, removeBot, getBots, setReactions } = require('./db');
const { startBot } = require('./bot');
const router = express.Router();

// Bot Register
router.post('/register-bot', (req, res) => {
  const { bot_token } = req.body;
  addBot(bot_token);
  startBot(bot_token);
  res.json({ message: 'Bot registered and started!' });
});

// List Bots
router.get('/bots', (req, res) => {
  res.json(getBots());
});

// Remove Bot
router.delete('/remove-bot/:botToken', (req, res) => {
  const { botToken } = req.params;
  removeBot(botToken);
  res.json({ message: 'Bot removed!' });
});

// Set Reactions
router.post('/set-reactions', (req, res) => {
  const { bot_token, reactions } = req.body;
  setReactions(bot_token, reactions);
  res.json({ message: 'Reactions set successfully!' });
});

module.exports = router;
