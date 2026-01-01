const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 800,
    backgroundColor: '#ffd6e8',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    resizable: false,
    icon: path.join(__dirname, 'icon.png') // optional
  });

  win.loadFile('index.html');
  
  // Handle window controls from renderer
  ipcMain.on('window-minimize', () => {
    win.minimize();
  });
  
  ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  
  ipcMain.on('window-close', () => {
    win.close();
  });
  
  // Open DevTools in development (optional)
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});