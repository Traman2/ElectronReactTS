import { app, BrowserWindow } from 'electron'
import path from "path";
import { ipcHandle, isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.on('ready', () => {
  const splash = new BrowserWindow({
    width: 500,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    show: false
  });

  splash.loadFile(path.join(__dirname, "splash.html"));
  splash.once("ready-to-show", () => splash?.show());

  const mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    width: 1000,
    height: 700,
    webPreferences: {
      preload: getPreloadPath()
    },
  });

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123')
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));
  }

  mainWindow.once("ready-to-show", () => {
    setTimeout(() => {
      if (splash) {
        splash.close();
      }
      mainWindow.show();
    }, 3000);
  });

  //Electron handlers
  ipcHandle("onClose", () => {
    app.quit();
  })

  ipcHandle("onFullScreen", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  })

  ipcHandle("onMinimize", () => {
    mainWindow.minimize();
  })
})
