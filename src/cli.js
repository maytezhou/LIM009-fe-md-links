#!/usr/bin/env node
 //Grab provided args
/*const [,,...args]=process.argv;
//Print hello world provided args
console.log(args);*/

// Grab provided args 
//console.log(__dirname);
//console.log(__filename);
import * as f from './index.js';
console.log(require('./index.js'));

//console.log(command);
//console.log(command[1]); // ruta relativa del archivo donde estoy
//console.log(command[2]); // 1 er commando que ingresa la persona
//console.log(command[3]); // 2 do commando que ingresa la persona
const command = process.argv;

//console.log(command)
const userCommand = (command1) => {
    return command1[2];
};


export const pathCommandUser = userCommand(command);


const options1 = (command) => {
    return command[3];
};


export const options1User = options1(command);
//console.log(options1User);
const options2 = (command) => {
    return command[4];
};
export const options2User = options2(command);
//console.log(options2User);

/* checkIfItsFileOrDir(mdLinks(userCommand));  */

const options = {
    validate: false,
};
const cli = (path, string1, string2) => {

    //console.log(string2);
    if (path !== undefined && string1 == '--validate' && string2 == undefined) {

        options.validate = true
        return mdLinks(path, options).then((response) => {
            console.log(response);
        });

    } else if (path !== undefined && string1 == undefined && string2 == undefined) {
        options.validate = false;
        return mdLinks(path, options).then((response) => {
            console.log(response);
        });
    }

};
//cli(pathCommandUser, options1User, options2User);