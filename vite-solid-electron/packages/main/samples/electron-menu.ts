import { Menu, app, BrowserWindow, ipcMain } from 'electron';
export const MenuInit = (mainWindow:BrowserWindow | null )=>{
    const menu = Menu.buildFromTemplate([
        {
            label: '&Ffff' + app.name,
            submenu: [
                {
                    click: () => {
                        // ipcMain.on('counter-value', (_event, value) => {
                        //     console.log('counter-value=', value) // 将打印到 Node 控制台
                        // })
                        mainWindow?.webContents.send('update-counter', 1)
                    },

                    label: '&Incrementcc',
                    role: 'zoomIn',
                    // submenu: [
                    //     {
                    //         label: 'dd',
                    //     }
                    // ]
                },
                {
                    click: () => mainWindow?.webContents.send('update-counter', -1),
                    label: 'Decrement',
                }
            ]
        }
    ])
    setTimeout(()=>{
        console.log(222)
        Menu.sendActionToFirstResponder('zoomIn')
    }, 1000)

    Menu.setApplicationMenu(menu)
}

