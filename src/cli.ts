import prompts from 'prompts'

let options:{
    type:string,
    projectName:string,
    usePackageJson:boolean,
    dbBoilerplate:string
} = 
{type:'',projectName:'',usePackageJson:false,dbBoilerplate:''};

const setOptions = async () => {

    //choose what base boiler plate
    const selectedBoilerPlate = await prompts({
        type:'select',
        name:'value',
        message:'What Do You Want to Create?',
        choices:[
            { title:'BackEnd Node Server',value:'node-server' },
            { title:'Exit',value:'exit' },
        ],
        initial:1
    })

    if(selectedBoilerPlate.value === 'exit'){
        process.exit()
    }

    options.type = selectedBoilerPlate.value

    //asks for project name
    const userProjectName = await prompts({
        type:'text',
        name:'value',
        message:'What is the Name of your project?'
    })

    options.projectName = userProjectName.value.toLowerCase().replace(/\s/g,'-').replace(/[^a-zA-Z0-9\-]/g,'')

    //asks if to use a package.json
    const createPackageJson = await prompts({
        type:'toggle',
        name:'value',
        message:'Do you want a package.json?'
    })

    options.usePackageJson = createPackageJson.value


    //ask for what db boilerplate to use
    const dbBoilerplate = await prompts({
        type:'select',
        name:'value',
        message:'What Data Base Boilerplate Do You Want To Use?',
        choices:[
            { title: 'MongoDB, User Routes And Auth', value: 'users'},
            { title: 'MongoDB', value: 'mongo' },
            { title:'None',value:'none' }
        ]
    });

    options.dbBoilerplate = dbBoilerplate.value

    return options
}

export default setOptions