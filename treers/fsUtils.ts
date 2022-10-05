import fs from 'fs-extra';

let ignoreRegex: null | string = null
// console.log(
//     dirToJson(__dirname)
// )



type StructureType = {
    [pathname: string]: (string | StructureType) []
}

export function dirToJson(path: string) {

    let stats = fs.lstatSync(path),

        structure: StructureType = {}

    if (stats.isDirectory()) {
        let dir: {}[] = fs.readdirSync(path)

        if (ignoreRegex) {
            dir = dir.filter((val) => {
                // @ts-ignore
                return !ignoreRegex.test(val)
            })
        }
        dir = dir.map((child) => {
            let childStats = fs.lstatSync(path + '/' + child)
            return childStats.isDirectory() ? dirToJson(path + '/' + child) : child
        })
        let dirName = path.replace(/.*\/(?!$)/g, '')
        structure[dirName] = sortDir(dir)
    } else {
        let fileName = path.replace(/.*\/(?!$)/g, '')
        return fileName
    }
    return structure
}


function sortDir(arr: any[]): StructureType[] {
    let i = arr.length - 1
    while (i >= 0) {
        if (typeof arr[i] === 'object') {
            let obj = arr.splice(i, 1)
            arr.push(obj[0])

        }
        i--
    }
    return arr
}
