import { app, BrowserWindow, ipcMain } from 'electron'
import path from "path";
const createWindow = () => {
  const win = new BrowserWindow({
    autoHideMenuBar: false,
    frame: false,
    transparent: true,
    resizable: false,
    show: false,
    webPreferences: {
      preload: path.join(app.getAppPath(), '/src/electron/preload.ts'), // 👈 relative to main.js
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  win.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));

  win.webContents.on("did-finish-load", async () => {
    
    //set to size of window
    const { width, height } = await win.webContents.executeJavaScript(`
    (() => {
      const el = document.getElementById("root"); // 👈 your React root
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    })()
  `);
  
  win.setBounds({ width, height });
  win.show();
  });
}

ipcMain.on('close', () => {
  console.log("Closing...")
  app.quit()
})

app.whenReady().then(() => {
  createWindow()
})