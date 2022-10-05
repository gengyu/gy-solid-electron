import { Menu, app, BrowserWindow, ipcMain } from 'electron';
export const MenuInit = (mainWindow:BrowserWindow | null )=>{
    const menu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                {
                    click: () => {
                        // ipcMain.on('counter-value', (_event, value) => {
                        //     console.log('counter-value=', value) // 将打印到 Node 控制台
                        // })
                        mainWindow?.webContents.send('update-counter', 1)
                    },
                    label: 'Increment',
                },
                {
                    click: () => mainWindow?.webContents.send('update-counter', -1),
                    label: 'Decrement',
                }
            ]
        }
    ])
    Menu.setApplicationMenu(menu)
}

