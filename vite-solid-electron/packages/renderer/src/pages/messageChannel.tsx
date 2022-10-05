import { Component, createEffect, Suspense } from 'solid-js';
import { useRouteData } from 'solid-app-router';

const channel = new MessageChannel()

export default function messageChannel() {
    //     window.ipcRenderer.postMessage('port', null, [port1])
    const send = () => {

        // port1 和 port2 之间唯一的不同是你如何使用它们。 消息
        // 发送到port1 将被port2 接收，反之亦然。
        const port1 = channel.port1
        const port2 = channel.port2;

        // 允许在另一端还没有注册监听器的情况下就通过通道向其发送消息
// 消息将排队等待，直到一个监听器注册为止。
//         port2.postMessage({answer: 42})

// 这次我们通过 ipc 向主进程发送 port1 对象。 类似的，
// 我们也可以发送 MessagePorts 到其他 frames, 或发送到 Web Workers, 等.
        console.log(3333)
        try {
            window.ipcRenderer.postMessage('port', port1, [port2]);
        } catch (e) {
            console.log(e, 11111)
        }


    }
    return <>
        <div>
            <button onclick={ send }>button</button>
            dddd
        </div>
    </>

}
