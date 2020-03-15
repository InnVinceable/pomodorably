const fs = require('fs');

const path = 'config.json';

const initialConfig = {
    worktime: 25,
    breaktime: 5,
    minimizeToTray: true,
    showNotifications: true,
    shortcut: 'Alt+Shift+K'
}

const loadConfiguration = () => {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(initialConfig));
    }

    let rawdata = fs.readFileSync(path);
    let config = JSON.parse(rawdata);

    return config;
}

module.exports = loadConfiguration;
