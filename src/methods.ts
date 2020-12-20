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

export default {
    getAllDirectories,
}