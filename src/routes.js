const express = require('express');
const pool = require('./db');
const { startBot } = require('./bot');
const router = express.Router();

// Bot Register
router.post('/register-bot', async (req, res) => {
  const { bot_token } = req.body;
  try {
    await pool.query('INSERT INTO bots (bot_token) VALUES ($1)', [bot_token]);
    startBot(bot_token);
    res.json({ message: 'Bot registered and started!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List Bots
router.get('/bots', async (req, res) => {
  const bots = await pool.query('SELECT * FROM bots');
  res.json(bots.rows);
});

// Remove Bot
router.delete('/remove-bot/:botToken', async (req, res) => {
  const { botToken } = req.params;
  await pool.query('DELETE FROM bots WHERE bot_token = $1', [botToken]);
  res.json({ message: 'Bot removed!' });
});

// Set Reactions
router.post('/set-reactions', async (req, res) => {
  const { bot_token, reactions } = req.body;
  await pool.query('DELETE FROM reactions WHERE bot_token = $1', [bot_token]);
  for (let reaction of reactions) {
    await pool.query('INSERT INTO reactions (bot_token, reaction) VALUES ($1, $2)', [bot_token, reaction]);
  }
  res.json({ message: 'Reactions set successfully!' });
});

// Master Bot Features
router.get('/master/bots', async (req, res) => {
  const bots = await pool.query('SELECT * FROM bots');
  res.json(bots.rows);
});

router.post('/master/broadcast', async (req, res) => {
  const { message } = req.body;
  const bots = await pool.query('SELECT bot_token FROM bots');
  for (let bot of bots.rows) {
    const botInstance = new Telegraf(bot.bot_token);
    await botInstance.telegram.sendMessage('YOUR_CHANNEL_ID', message);
  }
  res.json({ message: 'Broadcast sent!' });
});

module.exports = router;
