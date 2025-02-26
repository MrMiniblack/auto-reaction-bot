
const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'db.json');

// Function to read data from db.json
function readData() {
  if (!fs.existsSync(dbFilePath)) {
    return { bots: [], reactions: {} };
  }
  const rawData = fs.readFileSync(dbFilePath);
  return JSON.parse(rawData);
}

// Function to write data to db.json
function writeData(data) {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

// Function to add a bot
function addBot(botToken) {
  let db = readData();
  if (!db.bots.includes(botToken)) {
    db.bots.push(botToken);
    writeData(db);
  }
}

// Function to remove a bot
function removeBot(botToken) {
  let db = readData();
  db.bots = db.bots.filter(token => token !== botToken);
  delete db.reactions[botToken]; // Also remove reactions
  writeData(db);
}

// Function to get all bots
function getBots() {
  return readData().bots;
}

// Function to set reactions
function setReactions(botToken, reactions) {
  let db = readData();
  db.reactions[botToken] = reactions;
  writeData(db);
}

// Function to get reactions
function getReactions(botToken) {
  return readData().reactions[botToken] || [];
}

module.exports = { addBot, removeBot, getBots, setReactions, getReactions };
