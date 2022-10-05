import { dialog, ipcMain } from 'electron';

import treer from 'treers';

console.log(treer,333)
export async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory']
    })
    if (canceled) {
        return
    } else {
        return filePaths[0]
    }
}
export async function handleFileOpenTree(): Promise<treer.Structure | undefined> {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory']
    })
    if (canceled) {
        return
    } else {
        return treer(filePaths[0])
    }
}

export function initFileDailog(){
    ipcMain.handle('dialog:openFile', handleFileOpen)
    ipcMain.handle('dialog:openFileTree', handleFileOpenTree)
}
