import { BrowserWindow } from 'electron';


export function initSelectBluetooth(mainWindow: BrowserWindow){
    mainWindow.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
        event.preventDefault()
        console.log('deviceList====',deviceList)
        if (deviceList && deviceList.length > 0) {
            callback(deviceList[0].deviceId)
        }
    })

}
