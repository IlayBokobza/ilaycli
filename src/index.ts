import { BoilerFile } from './fileClass'
import prompts from 'prompts'
import chalk from 'chalk';
import files from './files';
import root from 'app-root-path';

//global vars
let projectName:string;
let useMongo:boolean = false;
let createPackageJsonG:boolean = false;


const createNodeServer = async () => {
    const techUsed = await prompts({
        type:'multiselect',
        name:'value',
        message:'What Features Do You Want To Use?',
        choices:[
            { title: 'MongoDB', value: 'mongo' },
            { title: 'User Routes And Auth', value: 'users'},
        ]
    })

    if(techUsed.value.indexOf('users') !== -1){
        new BoilerFile({ name:'moongose',extension:'js',path:`${root.path}/server/db` },files.nodeServer.mongo(projectName)).write()
        new BoilerFile({ name:'index',extension:'js',path:`${root.path}/server` },files.nodeServer.fullNodeIndex).write()
        useMongo = true
    }else if(techUsed.value.indexOf('mongo') !== -1){
        new BoilerFile({ name:'moongose',extension:'js',path:`${root.path}/server/db` },files.nodeServer.mongo(projectName)).write()
        new BoilerFile({ name:'index',extension:'js',path:`${root.path}/server` },files.nodeServer.nodeIndexMongo).write()
        useMongo = true
    }else {
        new BoilerFile({ name:'index',extension:'js',path:`${root.path}/server` },files.nodeServer.normalNodeServer).write()
    }

    if(createPackageJsonG){
        if(useMongo){
            new BoilerFile({ name:'package',extension:'json',path:`${root.path}/server` },files.nodeServer.packageJsonMongo(projectName)).write()
        }else{
            new BoilerFile({ name:'package',extension:'json',path:`${root.path}/server` },files.nodeServer.packageJsonNoMongo(projectName)).write()
        }
    }

    console.log(chalk.green('Boiler Plate Generated!\n cd server \n npm i'))
}

(async () => {
    const selectedBoilerPlate = await prompts({
        type:'select',
        name:'value',
        message:'What Do You Want to Create?',
        choices:[
            { title:'BackEnd Node Server',value:'node-server' },
            { title:'Exit',value:null },
        ],
        initial:1
    })

    const userProjectName = await prompts({
        type:'text',
        name:'value',
        message:'What is the Name of your project?'
    })

    projectName = userProjectName.value
    projectName = projectName.toLowerCase().replace(/\s/g, '')

    const createPackageJson = await prompts({
        type:'toggle',
        name:'value',
        message:'Do you want a package.json?'
    })

    createPackageJsonG = createPackageJson.value

    switch(selectedBoilerPlate.value){
        case 'node-server':
            createNodeServer()
            break;

        case null:
            break;
    }

    
})()