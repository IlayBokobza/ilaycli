import fs from 'fs'
import path from 'path'
import methods from './methods'

export class BoilerFile{

    name:string
    extension:string
    content:string
    path:string

    constructor(options:{ name:string,extension:string,path:string },content:string){
        this.name = options.name
        this.extension = options.extension
        this.content = content
        this.path = path.resolve(__dirname,options.path)
    }

    write(){
        const folders = methods.getAllDirectories(this.path)
        let currentPath = ''
        folders.forEach((folder:string) => {
            
            if(!currentPath){
                currentPath += folder
                return
            }

            currentPath += `/${folder}`
            
            if(!fs.existsSync(currentPath)){
                fs.mkdirSync(`${currentPath}`)
            }
        })
        fs.writeFileSync(`${this.path}/${this.name}.${this.extension}`,this.content)
    }

    update(content:string){
        this.content = content
        return this
    }
}