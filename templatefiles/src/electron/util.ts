import { ipcMain, WebContents } from "electron";

export function isDev(): boolean  {
    return process.env.NODE_ENV === "development";
}

//TypeScript wrapper around ipcfunctions (key and callback function to execute when listner is triggered)
export function ipcHandle<Key extends keyof EventPaylaodMapping>(
  key: Key, 
  handler: ()=> EventPaylaodMapping[Key]
) {
  ipcMain.handle(key, () => handler());
}

export function ipcWebContentSend<Key extends keyof EventPaylaodMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPaylaodMapping[Key]
) {
  webContents.send(key, payload);
}
