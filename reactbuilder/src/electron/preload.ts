const { contextBridge, ipcRenderer } = require('electron');

//expose a listner to the frontend, ipcRender send then called from here\
contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => {
    ipcRenderer.send('close');
  },
});