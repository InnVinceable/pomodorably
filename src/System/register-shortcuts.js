const { globalShortcut, Notification } = require('electron');

const registerShortcuts = (eventQueue, config) => {
    let running = false;
    globalShortcut.register(config.shortcut, () => {
        if (!running) {
            if (config.showNotifications) {
                let notification = new Notification({
                    title: 'Pomadorably Started',
                    body: 'Pomadora timer started'
                })
                notification.show();
            }
            running = true;
        } else {
            if (config.showNotifications) {
                let notification = new Notification({
                    title: 'Pomadorably Stopped',
                    body: 'Pomadora timer stopped'
                })
                notification.show();
            }
            running = false;
        }

        eventQueue.push('TOGGLE');
    });

    // globalShortcut.register('Alt+Shift+P', () => {
    //     eventQueue.push('PAUSE');
    // });
}

module.exports = registerShortcuts;
