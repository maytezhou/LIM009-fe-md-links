#!/usr/bin/env node
 //Grab provided args
/*const [,,...args]=process.argv;
//Print hello world provided args
console.log(args);*/

// Grab provided args 
//console.log(__dirname);
//console.log(__filename);
import { mdLinks } from './index.js';
import { gettingUniqueLinks } from './index.js';
import { gettingBrokenLinks } from './index.js';
import { gettingTotalLinks } from './index.js';


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
export const cli = (path, string1, string2) => {

    //console.log(string2);
    if (path !== undefined && string1 == '--validate' && string2 == undefined) {

        options.validate = true
        return mdLinks(path, options).then((response) => {
            //console.log(response);
            const newArrObjLinks = response.map((obj) => {
                    //console.log(`${obj.file} ${obj.href} ${(obj.ok!== 'OK')?'fail':obj.ok} ${obj.status} ${obj.text}`);
                    return `${obj.file} ${obj.href} ${(obj.ok!== 'OK')?'fail':obj.ok} ${obj.status} ${obj.text}`;
                })
                //console.log(newArrObjLinks.toString());
            return newArrObjLinks.toString();
        });

    } else if (path !== undefined && string1 == undefined && string2 == undefined) {
        options.validate = false;
        return mdLinks(path, options).then((response) => {
            //console.log(response);
            const newArrObjLinks = response.map(obj => {
                //console.log(`${obj.file},${obj.href},${obj.text}\n`);
                return `${obj.file}\n${obj.href}\n${obj.text}`;
            });
            //console.log(newArrObjLinks.toString());
            const result = newArrObjLinks.toString().replace(/,/g, '\n');
            //console.log(result);
            return result;
        })
    } else if (path !== undefined && string1 == '--stats' && string2 == undefined) {
        options.validate = false;
        return mdLinks(path, options).then((response) => {

            //console.log(`Total:${gettingTotalLinks(response)},Unique:${gettingUniqueLinks(response)}`);
            return `Total:${gettingTotalLinks(response)},Unique:${gettingUniqueLinks(response)}`;
        })

    } else if (path !== undefined && string1 == '--stats' && string2 == '--validate' ||
        path !== undefined && string1 == '--validate' && string2 == '--stats'
    ) {
        options.validate = true;
        return mdLinks(path, options).then((response) => {
            // console.log(response);
            // console.log(`Total:${gettingTotalLinks(response)},Unique:${gettingUniqueLinks(response)},Broken:${gettingBrokenLinks(response)}`);
            return `Total:${gettingTotalLinks(response)},Unique:${gettingUniqueLinks(response)},Broken:${gettingBrokenLinks(response)}`;
        })

    }

};
//cli(pathCommandUser, options1User, options2User);