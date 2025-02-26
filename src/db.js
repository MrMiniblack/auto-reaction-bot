const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'db.json');

function readData() {
  if (!fs.existsSync(dbFilePath)) {
    return { bots: [], reactions: {} };
  }
  const rawData = fs.readFileSync(dbFilePath);
  return JSON.parse(rawData);
}

function writeData(data) {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

function addBot(botToken) {
  let db = readData();
  if (!db.bots.includes(botToken)) {
    db.bots.push(botToken);
    writeData(db);
  }
}

function removeBot(botToken) {
  let db = readData();
  db.bots = db.bots.filter(token => token !== botToken);
  delete db.reactions[botToken];
  writeData(db);
}

function getBots() {
  return readData().bots;
}

function setReactions(botToken, reactions) {
  let db = readData();
  db.reactions[botToken] = reactions;
  writeData(db);
}

function getReactions(botToken) {
  return readData().reactions[botToken] || [];
}

module.exports = { addBot, removeBot, getBots, setReactions, getReactions };
