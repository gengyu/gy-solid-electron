import chokidar  from 'chokidar';
import { BrowserWindow } from "electron";

class FsWatchr {

}

const fSWatcher = chokidar.watch([])

fSWatcher.on('change', (params)=>{
    console.log(params,33456)
})

// fSWatcher.unwatch();



export function intFsWatchr(mainWindow:BrowserWindow ){
    // setInterval(()=>{
        mainWindow.webContents.send('update-counter-1',100)
    // }, 800)
}
