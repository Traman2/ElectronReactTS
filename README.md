# Electron React TypeScript Template

Extracted this template out of the <a src="https://www.youtube.com/watch?v=fP-371MN0Ck&t=286s">`Electron Course - Code Desktop Application`</a> tutorial

## IPC Custom Adpater Functions

Electron's Inter-Process Communication (IPC) allows the main process and renderer processes to communicate. This template provides adapter functions to simplify this communication and ensure type safety.

### `ipcInvoke`

`ipcInvoke` is used to send a message to the main process and expect an asynchronous result.

**How to create an `ipcInvoke` in the preload context:**

To expose an `ipcInvoke` function securely to the renderer process, you define it within `electron.contextBridge.exposeInMainWorld` in `src/electron/preload.cts`.

**Example:**

```typescript
electron.contextBridge.exposeInMainWorld("electron", {
      //Create more function using ipcInvoke in here
     onClose: () => ipcInvoke("onClose")
} satisfies Window['electron'])
```

The main process should listen for `"onClose"` using `ipcMain.handle()` in `main.ts` to respond to this invocation.

### `ipcOn`

`ipcOn` is used to listen for messages from the main process.

**How to create an `ipcOn` in the preload context:**

To expose an `ipcOn` function securely to the renderer process, you define it within `electron.contextBridge.exposeInMainWorld` in `src/electron/preload.cts`.

**Example:**

```typescript
electron.contextBridge.exposeInMainWorld("electron", {
    // ... existing exposed functions ...
    onUpdateCounter: (callback: (count: number) => void) => ipcOn("update-counter", callback)
} satisfies Window['electron'])
```

In this example:
- `onUpdateCounter` is the name of the function exposed to the renderer process.
- `"update-counter"` is the IPC channel used for communication.
- `callback` is a function that will be executed when a message is received on `"update-counter"` from the main process.

The main process can send messages on `"update-counter"` using `ipcWebContentSend()`.

### `ipcHandle`

`ipcHandle` is used in the main process to handle synchronous or asynchronous `ipcInvoke` calls from the renderer process.

**How to create an `ipcHandle` in the main process:**

You define `ipcHandle` in your main process file (e.g., `src/electron/main.ts`) to respond to `ipcInvoke` calls.

**Example:**

```typescript

import { ipcHandle } from './util';

ipcHandle("onClose", () => {
    // Logic to handle the onClose event, e.g., closing the window
    app.quit();
    console.log("onClose invoked!");
});
```

In this example:
- `"onClose"` is the IPC channel that `ipcInvoke` from the renderer process will call.
- The provided callback function will be executed when `onClose` is invoked. The return value of this callback will be sent back to the renderer process.

### `ipcWebContentSend`

`ipcWebContentSend` is used in the main process to send asynchronous messages to a specific renderer process (web contents).

**How to use `ipcWebContentSend` in the main process:**

You use `ipcWebContentSend` in your main process file (e.g., `src/electron/main.ts`) to send data to the renderer process, which can be listened to using `ipcOn`.

**Example:**

```typescript

import { ipcWebContentSend } from './util';
import { BrowserWindow } from 'electron';

const mainWindow = new BrowserWindow({ /* ... */ });

// Example of sending a message to the renderer process
ipcWebContentSend("update-counter", mainWindow.webContents, {
    cpuUsage,
    ramUsage,
    storageUsage: storageData.usage
});
```

In this example:
- `"update-counter"` is the IPC channel on which the renderer process is listening (via `ipcOn`).
- `mainWindow.webContents` specifies which renderer process to send the message to.
- `5` is the payload being sent to the renderer process.