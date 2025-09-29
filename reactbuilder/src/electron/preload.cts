const electron = require('electron') as typeof import('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    subscribeStatistics: (callback) => {
        electron.ipcRenderer.on("statistics", (_, stats) => {
            callback(stats);
        })  
    },
    getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
    onClose: () => electron.ipcRenderer.invoke("onClose")
} satisfies Window['electron'])
