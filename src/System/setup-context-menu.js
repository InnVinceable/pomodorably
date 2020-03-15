const { app, Menu, Tray } = require('electron');

const setupContextMenu = (win) => {
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: () => {
                win.show();
            }
        },
        {
            label: 'Quit', click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);
    let tray = new Tray('dist/tray.ico')

    tray.setContextMenu(contextMenu)
}

module.exports = setupContextMenu;
