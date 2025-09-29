//Expose ipc adapter functions to frontend render side

const electron = require('electron') as typeof import('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    onClose: () => ipcInvoke("onClose")
} satisfies Window['electron'])


//Type safety functions
function ipcInvoke<Key extends keyof EventPaylaodMapping>(
    key: Key
): Promise<EventPaylaodMapping[Key]>{
    return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPaylaodMapping>(
    key: Key,
    callback: (payload: EventPaylaodMapping[Key]) => void
) {
    electron.ipcRenderer.on(key, (_, payload) => callback(payload));
}
