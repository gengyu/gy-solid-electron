


export default function (){

    const click =async ()=>{

        // @ts-ignore
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true
        })
        console.log(device)
        document.getElementById('device-name')!.innerHTML = device.name || `ID: ${device.id}`

    }
    return <div>
        bluetooth:
        <button onclick={click}> button </button>
        <div id='device-name'> button </div>
    </div>
}
