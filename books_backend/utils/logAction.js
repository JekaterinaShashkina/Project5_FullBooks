const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/actions.log');

function logAction(extra = '') {
  const time = new Date().toISOString();
  // const username = user?.username || 'Unknown';
//   const role = user?.role?.name || 'guest';

  const message = `[${time}] ${extra ? ` (${extra})` : ''}\n`;
    if (!fs.existsSync(path.join(__dirname, '../logs'))) {
    fs.mkdirSync(path.join(__dirname, '../logs'));
    }
    fs.appendFile(logFilePath, message, (err) => {
        if (err) console.error('Logimine ebaõnnestus:', err);
    });
}

module.exports = logAction;