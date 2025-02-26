const { Telegraf } = require('telegraf');
const { getBots, getReactions } = require('./db');

async function startBot(botToken) {
  const bot = new Telegraf(botToken);

  bot.on('message', async (ctx) => {
    try {
      const reactions = getReactions(botToken);
      if (reactions.length > 0) {
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
  const bots = getBots();
  bots.forEach(startBot);
}

module.exports = { startBot, loadBots };
