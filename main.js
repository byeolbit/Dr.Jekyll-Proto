const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const remote = electron.remote;
const path = require('path');
const url = require('url');

require('dotenv').config();

let win = null;

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 600, height: 400});

  // Specify entry point
  if (process.env.PACKAGE === 'true'){
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
    win.loadURL(process.env.HOST);
    win.webContents.openDevTools();
  }

  // Show dev tools
  // Remove this line before distributing
  // win.webContents.openDevTools()

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

  ipcMain.on('wsize', () => {
      console.log(win);
      console.log(remote);
  })

});


app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});