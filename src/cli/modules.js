module.exports = {
    appUpdate: (appPath, name) => {
        const fs = require('fs');
        const readline = require('readline').createInterface({
            input: fs.createReadStream(appPath)
        });
        let lineNumber = 0;
        readline.on('line', (line) => {
            ++lineNumber;
            if (lineNumber === 17) {
                let injection = `app.use(\'/${name}\', require(\'./controllers/${name}\'));`
                let appFile = fs.readFileSync(appPath).toString().split("\n");
                appFile.splice(lineNumber, 0, injection);
                let updatedAppFile = appFile.join("\n");
                fs.writeFile((appPath), updatedAppFile, function (err) {
                    if (err) return false;
                });
            }
        });
        return true
    },
    controllerUpdate: (controllerPath, name) => {
        const fs = require('fs');
        const readline = require('readline').createInterface({
            input: fs.createReadStream(controllerPath)
        });
        let lineNumber = 0;
        readline.on('line', (line) => {
            ++lineNumber;
            if (lineNumber === 4) {
                let injection = `res.render(\`pages/${name}.hbs\', {name : \'${name}\'});`;
                let controllerFile = fs.readFileSync(controllerPath).toString().split("\n");
                controllerFile.splice(lineNumber, 0, injection);
                let updatedControllerFile = controllerFile.join("\n");
                fs.writeFile((controllerPath), updatedControllerFile, function (err) {
                    if (err) return false;
                });
            }
        });
        return true
    },
    viewUpdate: (viewPath, name) => {
        const fs = require('fs');
        const readline = require('readline').createInterface({
            input: fs.createReadStream(viewPath)
        });
        let lineNumber = 0;
        readline.on('line', (line) => {
            ++lineNumber;
            if (lineNumber === 1) {
                let injection = `<h3>{{name}} controller view</h3>`;
                let viewFile = fs.readFileSync(viewPath).toString().split("\n");
                viewFile.splice(lineNumber, 0, injection);
                let updatedViewFile = viewFile.join("\n");
                fs.writeFile((viewPath), updatedViewFile, function (err) {
                    if (err) return false;
                });
            }
        });
        return true
    }
};