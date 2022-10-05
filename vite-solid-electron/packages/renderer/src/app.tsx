import { Component } from "solid-js";
import { Link, useRoutes, useLocation } from "solid-app-router";

import { routes } from "./routes";
import darkMode from "@/pages/darkMode";

console.log(window.fs.readdir);
window.ipcRenderer.send('set-title', 'yyyyyyyy')
window.fs.readdir('./', function (err, dirList) {
   console.log(err, dirList)
})
const App: Component = () => {
    const location = useLocation();
    const Route = useRoutes(routes);

    return (
        <>
            <nav class="bg-gray-200 text-gray-900 px-4">
                <ul class="flex items-center">
                    <li class="py-2 px-4">
                        <Link href="/" class="no-underline hover:underline">
                            Home
                        </Link>
                    </li>
                    <li class="py-2 px-4">
                        <Link href="/SyncFileList" class="no-underline hover:underline">
                            SyncFileList
                        </Link>
                    </li>
                    <li class="py-2 px-4">
                        <Link href="/messageChannel" class="no-underline hover:underline">
                            Channel
                        </Link>
                    </li>
                    <li class="py-2 px-4">
                        <Link href="/darkMode" class="no-underline hover:underline">
                            darkMode
                        </Link>
                    </li>
                    <li class="py-2 px-4">
                        <Link href="/about" class="no-underline hover:underline">
                            About
                        </Link>
                    </li>
                    <li class="py-2 px-4">
                        <Link href="/error" class="no-underline hover:underline">
                            Error
                        </Link>
                    </li>

                    <li class="text-sm flex items-center space-x-1 ml-auto">
                        <span>URL:</span>
                        <input
                            class="w-75px p-1 bg-white text-sm rounded-lg"
                            type="text"
                            readOnly
                            value={ location.pathname }
                        />
                    </li>
                </ul>
            </nav>

            <main>
                <Route/>
            </main>
        </>
    );
};

export default App;
