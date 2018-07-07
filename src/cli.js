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
                    const readline = require('readline').createInterface({
                        input: fs.createReadStream(path.join(__dirname, '../', 'app.js'))
                    });
                    let lineNumber = 0;
                    readline.on('line', (line) => {
                        ++lineNumber;
                        if (lineNumber === 17) {
                            let injection=`app.use(\'/${name}\', require(\'./controllers/${name}\'));`
                            let appFile=fs.readFileSync(path.join(__dirname, '../', 'app.js')).toString().split("\n");
                            appFile.splice(lineNumber, 0, injection);
                            let updatedAppFile = appFile.join("\n");
                            fs.writeFile(path.join(__dirname, '../', 'app.js'), updatedAppFile, function (err) {
                                if (err) return console.log(err);
                            });
                        }
                    });
                    console.log(`Controller ${name} created at ${controllersDir}`);
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