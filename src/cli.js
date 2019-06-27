#!/usr/bin/env node

import { mdLinks } from './index.js';
import { gettingUniqueLinks } from './index.js';
import { gettingBrokenLinks } from './index.js';
import { gettingTotalLinks } from './index.js';
const command = process.argv;

const userCommand = (command1) => { return command1[2]; };
export const pathCommandUser = userCommand(command);

const options1 = (command) => { return command[3]; };
export const options1User = options1(command);

const options2 = (command) => { return command[4]; };
export const options2User = options2(command);

const options = {
    validate: false,
};
export const cli = (path, string1, string2) => {
    if (path !== undefined && string1 === '--validate' && string2 === undefined) {
        options.validate = true
        return mdLinks(path, options).then((response) => {
            const newArrObjLinks = response.map((obj) => {
                return `${obj.file} ${obj.href} ${(obj.ok!== 'OK')?'fail':obj.ok} ${obj.status} ${obj.text}`;
            })
            const result = newArrObjLinks.toString().replace(/,/g, '\n');
            return result;
        });

    } else if (path !== undefined && string1 === undefined && string2 === undefined) {
        options.validate = false;
        return mdLinks(path, options).then((response) => {
            const newArrObjLinks = response.map(obj => {
                return `${obj.file}\n${obj.href}\n${obj.text}`;
            });
            const result = newArrObjLinks.toString().replace(/,/g, '\n');
            return result;
        })
    } else if (path !== undefined && string1 === '--stats' && string2 === undefined) {
        options.validate = false;
        return mdLinks(path, options).then((response) => {
            return `Total:${gettingTotalLinks(response)},Unique:${gettingUniqueLinks(response)}`;
        })

    } else if (path !== undefined && string1 === '--stats' && string2 === '--validate' ||
        path !== undefined && string1 == '--validate' && string2 == '--stats'
    ) {
        options.validate === true;
        return mdLinks(path, options).then((response) => {
            return `Total:${gettingTotalLinks(response)},Unique:${gettingUniqueLinks(response)},Broken:${gettingBrokenLinks(response)}`;
        })
    }
};


if (require.main === module) {
    cli(pathCommandUser, options1User, options2User).then((result) => {
        console.log(result);
    });
}