const { app } = require('electron')
const setupWindow = require('./setup-window');
const setupContextMenu = require('./setup-context-menu');
const registerShortcuts = require('./register-shortcuts');
const registerIpcListeners = require('./register-ipc-listeners');
const loadConfiguration = require('./load-configuration');

require('electron-reload')('dist');

const startApplication = () => {
    let win
    let eventQueue = [];
    let config = loadConfiguration();

    const createWindow = () => {
        win = setupWindow(config);
        if (config.minimizeToTray)
        {
            setupContextMenu(win);
        }
    }

    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (win === null) {
            createWindow()
        }
    })

    app.on('ready', () => {
        registerShortcuts(eventQueue, config);
    })

    app.setAppUserModelId(process.execPath)

    registerIpcListeners(eventQueue, config);
}

module.exports = startApplication;
