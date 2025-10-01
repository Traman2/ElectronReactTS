//Expose ipc adapter functions to frontend render side
const electron = require('electron') as typeof import('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    onClose: () => ipcInvoke("onClose"),
    onFullScreen: () => ipcInvoke("onFullScreen"),
    onMinimize: () => ipcInvoke("onMinimize")
    
} satisfies Window['electron'])


//Type safety functions (DON'T EDIT), SHOULD ONLY BE USED IN preload.cts
function ipcInvoke<Key extends keyof EventPaylaodMapping>(
    key: Key //Key of function to invoke
): Promise<EventPaylaodMapping[Key]>{
    return electron.ipcRenderer.invoke(key); //wrapper to invoke function
}

function ipcOn<Key extends keyof EventPaylaodMapping>( //Listner for payload in frontend
    key: Key,
    callback: (payload: EventPaylaodMapping[Key]) => void
) {
    electron.ipcRenderer.on(key, (_, payload) => callback(payload));
}
