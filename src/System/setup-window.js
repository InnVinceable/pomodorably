const { app, BrowserWindow } = require('electron');

const setupWindow = (config) => {
    let win = new BrowserWindow({
        width: 400,
        height: 600,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('dist/index.html')

    win.on('closed', () => {
        win = null
    })

    win.on('minimize', function (event) {
        event.preventDefault();
        win.hide();
    });

    win.on('close', function (event) {
        if (!app.isQuiting && config.minimizeToTray) {
            event.preventDefault();
            win.minimize();
        }
        return false;
    });

    return win;
}

module.exports = setupWindow;
