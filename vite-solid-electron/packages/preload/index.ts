import fs from 'fs-extra'
import { contextBridge, ipcRenderer } from 'electron'
import { domReady } from './utils'
import { useLoading } from './loading'
import { on } from "solid-js";

const {appendLoading, removeLoading} = useLoading()

;(async () => {

    await domReady()
    ipcRenderer.on('port', e=>{
        console.log(6666, e.ports)
        const port =  e.ports[0];
        port.onmessage = function (message){
            console.log('message====',message)
        }
        // const port.on('me')
        // window.electronMessagePort = e.ports[0]
    })
    appendLoading()
})()

// --------- Expose some API to the Renderer process. ---------
contextBridge.exposeInMainWorld('fs', fs)
contextBridge.exposeInMainWorld('removeLoading', removeLoading)
contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer))
contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    openFileTree: () => ipcRenderer.invoke('dialog:openFileTree'),
    onUpdateCounter: (callback:any) => ipcRenderer.on('update-counter-1', callback)
})

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
    const protos = Object.getPrototypeOf(obj)

    for (const [key, value] of Object.entries(protos)) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) continue

        if (typeof value === 'function') {
            // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
            obj[key] = function (...args: any) {
                return value.call(obj, ...args)
            }
        } else {
            obj[key] = value
        }
    }
    return obj
}
