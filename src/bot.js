const { Telegraf } = require('telegraf');
const pool = require('./db');

async function startBot(botToken) {
  const bot = new Telegraf(botToken);

  bot.on('message', async (ctx) => {
    try {
      const res = await pool.query('SELECT reaction FROM reactions WHERE bot_token = $1', [botToken]);
      if (res.rows.length > 0) {
        const reactions = res.rows.map(row => row.reaction);
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        await ctx.react(randomReaction);
      }
    } catch (err) {
      console.error('Reaction Error:', err.message);
    }
  });

  bot.launch();
  console.log(`Bot started: ${botToken}`);
}

async function loadBots() {
  const bots = await pool.query('SELECT bot_token FROM bots');
  bots.rows.forEach(row => startBot(row.bot_token));
}

module.exports = { startBot, loadBots };
