#!/usr/bin/env node
import { BoilerFile } from './fileClass'
import chalk from 'chalk';
import files from './files';
import setOptions from './cli';
import methods from './methods';
import fs from 'fs'


const createNodeServer = async () => {

    //deletes server folder
    fs.rmdirSync(`${process.cwd()}/server`,{ recursive:true })

    if(options.dbBoilerplate === 'users'){
        new BoilerFile({ name:'mongoose',extension:'js',path:`${process.cwd()}/server/db` },files.nodeServer.mongo(options.projectName)).write()
        new BoilerFile({ name:'index',extension:'js',path:`${process.cwd()}/server` },files.nodeServer.fullNodeIndex).write()
        new BoilerFile({ name:'user',extension:'js',path:`${process.cwd()}/server/models` },files.nodeServer.userSchema).write()
        new BoilerFile({ name:'user',extension:'js',path:`${process.cwd()}/server/routes` },files.nodeServer.userRoutes).write()
        new BoilerFile({ name:'auth',extension:'js',path:`${process.cwd()}/server/middleware` },files.nodeServer.authMiddleware)

    }else if(options.dbBoilerplate === 'mongo'){
        new BoilerFile({ name:'moongose',extension:'js',path:`${process.cwd()}/server/db` },files.nodeServer.mongo(options.projectName)).write()
        new BoilerFile({ name:'index',extension:'js',path:`${process.cwd()}/server` },files.nodeServer.nodeIndexMongo).write()

    }else {
        new BoilerFile({ name:'index',extension:'js',path:`${process.cwd()}/server` },files.nodeServer.normalNodeServer).write()
    }


    //creating package json or dependencies file 
    let dependencies:{ name:string,version:string }[] = [{ name:'express',version:'^4.17.1' }]

    if(options.dbBoilerplate === 'users'){
        dependencies.push({ name:'mongoose',version:'^5.11.8' },{ name:'jsonwebtoken',version:'^8.5.1' },{ name:'bcryptjs',version:'^2.4.3' },{ name:'validator',version:'^13.4.2' })
    } else if(options.dbBoilerplate === 'mongo'){
        dependencies.push({ name:'mongoose',version:'^5.11.8' })
    }

    if(options.usePackageJson){
        new BoilerFile({ name:'package',extension:'json',path:`${process.cwd()}/server` },methods.createPackageJson(options.projectName,dependencies)).write()
    }else{
        new BoilerFile({ name:'dependencies',extension:'json',path:`${process.cwd()}/server` },JSON.stringify(methods.createDependenciesObject(dependencies))).write()
    }
}


//boiler plate options
let options:{
    type:string,
    projectName:string,
    usePackageJson:boolean,
    dbBoilerplate:string
}


(async () => {
    const selectedOptions = await setOptions()
    options = selectedOptions
    
    switch(options.type){
        case 'node-server':
            createNodeServer();
            break;
    }

    console.log(chalk.greenBright('Boiler Plate Generated! ✌'))
    console.log(chalk.blue('cd server 🚄'))
    console.log(chalk.blue('npm install 🎯'))
})()