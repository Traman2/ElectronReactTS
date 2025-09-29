import { ipcMain, WebContents } from "electron";

export function isDev(): boolean  {
    return process.env.NODE_ENV === "development";
}

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
