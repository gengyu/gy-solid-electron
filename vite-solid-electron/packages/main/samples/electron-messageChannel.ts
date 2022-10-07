
import { ipcMain, MessageChannelMain, BrowserWindow } from "electron";

const {port1, port2} = new MessageChannelMain();


export function initMessageChannels(mainWindow: BrowserWindow){

    mainWindow.on('ready-to-show', ()=>{
        console.log('ready-to-show')
        mainWindow.webContents.postMessage('port', null, [port1]);
        // setTimeout(()=>{
            port2.postMessage('-___________');
        // },3000)
    })
}

// ipcMain.on('port', (event, args) => {
//     const port = event.ports[0];
//     console.log('port====', port, args)
//     port.on('message', event=>{
//         const data = event.data
//         console.log("data===",data)
//     })
//
//     port.start();
// })
