const getAllDirectories = (path:string):string[] => {
    const output = []
    let currentFolder = ''

    for(let index = 0;index < path.length;index++){
        (() => {
            if(path[index] === '/' || path[index] === '\\'){
                output.push(currentFolder)
                currentFolder = ''
                return     
            }
    
            currentFolder += path[index]
    
            if(index === path.length - 1){
                output.push(currentFolder)
            }
        })()
    }

    return output
}


const createPackageJson = (name:string,dependencies:{ name:string,version:string }[]) => {
    let baseFile:any = {
        name,
        version: "1.0.0",
        description: "",
        main: "index.js",
        scripts: {
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        author: "",
        license: "ISC",
        dependencies: {}
    }

    dependencies.forEach((dependency) => {
        baseFile.dependencies[dependency.name] = dependency.version
    })

    return JSON.stringify(baseFile)
}

const createDependenciesObject = (arr:{ name:string,version:string }[]) => {
    let output:any = {}

    arr.forEach(item => output[item.name] = item.version)

    return output
}

export default {
    getAllDirectories,
    createPackageJson,
    createDependenciesObject,
}