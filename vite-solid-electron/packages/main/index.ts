import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { release } from 'os'
import { join } from 'path'
import './samples/electron-store'
import { handleFileOpen, initFileDailog } from "./samples/electron-file";
import { MenuInit } from "./samples/electron-menu";
import { initDarkmode } from "./samples/electron-darkmode";
import { intFsWatchr } from "./samples/electron-chokidar";

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
}

let win: BrowserWindow | null = null

initDarkmode()
initFileDailog();

async function createWindow() {

    win = new BrowserWindow({
        title: 'Main window',
        // 将路径中的预加载脚本传入 webPreferences.preload 选项
        // preload/index.cjs 有权访问两个 渲染器全局 (例如 window 和 document) 和 Node.js 环境。
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: false,
            preload: join(__dirname, '../preload/index.cjs')
        },
    })

    MenuInit(win);
    intFsWatchr(win);

    // initMessageChannels(win);
    // 蓝牙
    // initSelectBluetooth(win);

    if (app.isPackaged) {
        win.loadFile(join(__dirname, '../renderer/index.html'))
    } else {
        // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
        const url = `http://${ process.env['VITE_DEV_SERVER_HOST'] }:${ process.env['VITE_DEV_SERVER_PORT'] }`

        win.loadURL(url)
        win.webContents.openDevTools()
    }

    // Test active push message to Renderer-process
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({url}) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return {action: 'deny'}
    })

    /**
     * https://www.electronjs.org/zh/docs/latest/tutorial/quick-start#%E5%9F%BA%E6%9C%AC%E8%A6%81%E6%B1%82
     * 当 Linux 和 Windows 应用在没有窗口打开时退出了，macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口。
     * 因为窗口无法在 ready 事件前创建，你应当在你的应用初始化后仅监听 activate 事件。 通过在您现有的 whenReady() 回调中附上您的事件监听器来完成这个操作。
     *
     */
    app.on('activate', () => {
        console.log('window on activate,')
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    ipcMain.on('set-title', (event, title) => {
        // console.log(111,event.sender, title)
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win && win.setTitle(title)
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    win = null
    console.log('点击XXXX')
    if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore()
        win.focus()
    }
})

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        createWindow()
    }
})
