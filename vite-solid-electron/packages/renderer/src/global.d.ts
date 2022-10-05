import treer from "treers";

export {}

declare global {

    interface Window {
        // Expose some Api through preload script
        fs: typeof import('fs')
        ipcRenderer: import('electron').IpcRenderer
        removeLoading: () => void
        electronAPI: ElectronAPIInterface
    }
}

interface ElectronAPIInterface {
    openFile: () => Promise<string>
    openFileTree: () => Promise<treer.Structure | undefined>
    onUpdateCounter: (callback:any)=>void
}
