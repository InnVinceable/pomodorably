const { ipcMain, Notification } = require('electron')

const registerIpcListeners = (eventQueue, config) => {
    ipcMain.on('main-ping', (event, arg) => {
        running = arg;
        event.reply('main-response', eventQueue);
        eventQueue.splice(0,eventQueue.length);
    })

    ipcMain.on('main-break-notification', (event, arg) => {
        if (config.showNotifications)
        {
            let notification = new Notification({
                title: 'Pomodorably',
                body: 'Take a break!!!'
            })
            notification.show();
        }
        event.reply('ok', {})
    });

    ipcMain.on('main-work-notification', (event, arg) => {
        if (config.showNotifications)
        {
            let notification = new Notification({
                title: 'Pomodorably',
                body: 'Get back to work!'
            })
            notification.show();
        }
        event.reply('ok', {})
    });
}

module.exports = registerIpcListeners;
