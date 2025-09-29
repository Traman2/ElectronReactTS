# File organizer

Use 
```ts
export function ipcHandle<Key extends keyof EventPaylaodMapping>(
  key: Key, 
  handler: ()=> EventPaylaodMapping[Key]
) {
  ipcMain.handle(key, () => handler());
}
```

Implement in main like this
```ts
ipcHandle("getStaticData", () => {
    return getStaticData();
  });
```

