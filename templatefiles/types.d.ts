type EventPaylaodMapping = { //Different ipc mappings (MUST CORRESPOND TO WINDOW INTERFACE BELOW)
    onClose: void;
    onFullScreen: void;
    onMinimize: void;
}

interface Window { //Used in frontend through exposed ipc functions
    electron: {
        onClose: () => void,
        onFullScreen: () => void,
        onMinimize: () => void
    }
}
