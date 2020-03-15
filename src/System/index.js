const setupWindow = require('./setup-window');

const setupContextMenu = require('./setup-context-menu');

const registerShortcuts = require('./register-shortcuts');

const registerIpcListeners = require('./register-ipc-listeners')

const startApplication = require('./start-application');

module.exports = {
    setupWindow,
    setupContextMenu,
    registerShortcuts,
    registerIpcListeners,
    startApplication
}

