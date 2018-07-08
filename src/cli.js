#!/usr/bin/env node

const commander = require('commander');
const path = require('path');
const fs = require('fs');
const modules = require('./cli/modules');

commander
    .command('new <type> <name>')
    .action((type, name) => {
        switch (type) {
            case 'controller':
                let file = fs.existsSync(path.join(__dirname, `blueprints/${type}`));
                if (file === true) {
                    const controllersDir = path.join(__dirname, '../', 'controllers');
                    const viewsDir = path.join(__dirname, '../', 'views/pages');
                    const appPath = path.join(__dirname, '../', 'app.js');
                    const destControllerPath = `${controllersDir}/${name}.js`;
                    const destViewPath = `${viewsDir}/${name}.hbs`;
                    if (modules.appUpdate(appPath, name) === true) {
                        fs.copyFileSync(path.join(__dirname, `blueprints/${type}`), destControllerPath);
                        if (modules.controllerUpdate(destControllerPath, name) === true) {
                            fs.copyFileSync(path.join(__dirname, `blueprints/view`), destViewPath);
                            if (modules.viewUpdate(destViewPath, name) === true) {
                                console.log(`Controller ${name} created at ${controllersDir}`);
                                console.log(`View ${name} created at ${viewsDir}`);
                            }
                        }
                    }
                } else {
                    console.log(`ERROR -> Cannot create new controller: blueprint missing`);
                }
                break;
            case 'model':

                break;
            default:
                console.log(`ERROR -> undefined type: only controller and model can be create`);
                break;
        }
    });

commander.parse(process.argv);