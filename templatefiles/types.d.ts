type Statistics = {
    cpuUsage: number;
    ramUsage: number;
    storageUsage: number;
}

type StaticData = {
    totalStorage: number;
    cpuModel: string;
    totalMemoryGB: number;
}

type EventPaylaodMapping = {
    statistics: Statistics;
    getStaticData: StaticData;
    onClose: any;
}

interface Window { //Used in frontend through exposed ipc functions
    electron: {
        subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
        getStaticData: () => Promise<StaticData>,
        onClose: () => any
    }
}