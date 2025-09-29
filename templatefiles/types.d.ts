
type EventPaylaodMapping = {
    onClose: void;
}

interface Window { //Used in frontend through exposed ipc functions
    electron: {
        onClose: () => any
    }
}