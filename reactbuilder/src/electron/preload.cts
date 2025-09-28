const electron = require("electron");
const {ipcRenderer}  = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
    closeApp: () => ipcRenderer.send("close-app")
}) //add window.electron.closeApp() in close button handler

