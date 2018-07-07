#!/usr/bin/env node

const commander = require('commander');
const path = require('path');
const fs = require('fs');

commander
    .command('new <type> <name>')
    .action((type, name) => {
        switch (type) {
            case 'controller':
                let file = fs.existsSync(path.join(__dirname, `blueprints/${type}`));
                if (file === true) {
                    const controllersDir = path.join(__dirname, '../', 'controllers');
                    fs.copyFileSync(path.join(__dirname, `blueprints/${type}`), `${controllersDir}/${name}.js`);
                    console.log(`Controller ${name} created at ${controllersDir}`);
                } else {
                    console.log(`ERROR -> Cannot create new controller: blueprint missing`);
                }
                break;
            case 'model':

                break;
            default:
                console.log(`ERROR -> undefined type: only controller and model can be create`)
                break;
        }
    });

commander.parse(process.argv);