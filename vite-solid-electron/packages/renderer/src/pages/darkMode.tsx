import { Component, createEffect, createSignal, Suspense } from 'solid-js';
import { useRouteData } from 'solid-app-router';

export default function darkMode() {
    //     window.ipcRenderer.postMessage('port', null, [port1])
    const [isDarkMode, setDarkMode ] = createSignal(false)
    const send = async () => {
        const isDarkMode = await window.ipcRenderer.invoke('dark-mode:toggle');
        console.log(isDarkMode,2)
        setDarkMode(isDarkMode);
    }
    return <>
        <div>
            <button onclick={ send }>button</button>
            __{ isDarkMode().toString() }__
        </div>
    </>

}
