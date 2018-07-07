const serverConfig=require('../magma').server;
const app = require('../app');
const port = process.env.PORT || serverConfig.port;

switch(serverConfig.ssl){
    case true:
        const spdy = require('spdy');
        const fs = require('fs');
        const options = {
            key: fs.readFileSync(__dirname + '/openSSL/server.key'),
            cert: fs.readFileSync(__dirname + '/openSSL/server.crt')
        };
        spdy.createServer(options, app).listen(port, () => {
            console.log(`Running on port ${port} with SSL, use https instead of http`);
        });
        break;
    case false:
        app.listen(port,()=>{
            console.log(`Running on port ${port}`);
        })
        break;
}
