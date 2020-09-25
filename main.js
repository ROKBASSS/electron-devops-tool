// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, ipcMain } = require('electron');

const path = require('path');

let mainWindow = undefined;
let tray = undefined;

app.whenReady().then(() => {
  createTray()
  createWindow()
})

// Quit the app when the window is closed
app.on('window-all-closed', () => {
  app.quit()
});

function createTray() {
  tray = new Tray('tray.png')
  tray.setToolTip('Test Dev Ops App')
  tray.on("click", function (event) {
    toggleWindow()
  })
};

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 200,
    height: 300,
    useContentSize: true,
    transparent: true,
    show: false,
    alwaysOnTop: true,
    resizable: false,
    movable: false,
    fullscreen: false,
    frame: false
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.on('blur', () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide()
    }
  })
};

function toggleWindow() {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    showWindow()
  }
}

function showWindow() {
  let tray_pos = tray.getBounds();
  let win_pos = mainWindow.getBounds();
  console.log(win_pos.height)
  mainWindow.setPosition(tray_pos.x, tray_pos.y - win_pos.height + Math.round(tray_pos.height / 2))
  mainWindow.show();
}

ipcMain.on('show-window', () => {
  showWindow()
})