const { app, BrowserWindow, globalShortcut, ipcMain, Notification, Menu, Tray } = require('electron')

let win
let eventQueue = [];
let running = false;
let tray = null;

function createWindow() {
  win = new BrowserWindow({
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
    if (!app.isQuiting) {
      event.preventDefault();
      win.minimize();
    }
    return false;
  });

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
  tray = new Tray('dist/tray.ico')

  tray.setContextMenu(contextMenu)
}


app.on('ready', createWindow)

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
  globalShortcut.register('Alt+Shift+K', () => {
    if (!running) {
      let notification = new Notification({
        title: 'Pomadorably Started',
        body: 'Pomadora timer started'
      })
      notification.show();
    } else {
      let notification = new Notification({
        title: 'Pomadorably Stopped',
        body: 'Pomadora timer stopped'
      })
      notification.show();
    }

    eventQueue.push('TOGGLE');
  });

  globalShortcut.register('Alt+Shift+P', () => {
    eventQueue.push('PAUSE');
  });
})
app.setAppUserModelId(process.execPath)

ipcMain.on('main-ping', (event, arg) => {
  running = arg;
  event.reply('main-response', eventQueue);
  eventQueue = [];
})

ipcMain.on('main-break-notification', (event, arg) => {
  let notification = new Notification({
    title: 'Pomodorably',
    body: 'Take a break!!!'
  })
  notification.show();
  event.reply('ok', {})
});

ipcMain.on('main-work-notification', (event, arg) => {
  let notification = new Notification({
    title: 'Pomodorably',
    body: 'Get back to work!'
  })
  notification.show();
  event.reply('ok', {})
});
