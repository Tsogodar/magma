const serverConfig = require('../magma').server;
const clusterConfig = serverConfig.cluster;

const serverInstance = () => {
    const app = require('../app');
    const port = process.env.PORT || serverConfig.port;
        switch (serverConfig.ssl) {
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
                app.listen(port, () => {
                    console.log(`Running on port ${port}`);
                });
                break;
        }
};

switch (clusterConfig.enable) {
    case true:
        const cluster = require('cluster');
        const numCPUs = require('os').cpus().length;
        if (cluster.isMaster) {
            if(numCPUs<clusterConfig.cores){
              console.log(`WARNING: Not enough cores available, max: ${numCPUs}, set: ${clusterConfig.cores}`);
              console.log(`WARNING: Set cluster with ${numCPUs} cores`);
                for (let i = 0; i < numCPUs; i++) {
                    cluster.fork();
                }
            } else if(clusterConfig.cores<=0){
                console.log('WARNING: Too low cores in magma.json config');
                console.log(`WARNING: Set cluster with ${numCPUs} cores`);
                for (let i = 0; i < numCPUs; i++) {
                    console.log(`Set cluster with ${numCPUs} cores`);
                    cluster.fork();
                }
            }
            for (let i = 0; i < clusterConfig.cores; i++) {
                cluster.fork();
            }
        } else {
            serverInstance();
        }

        break;
    case false:
        serverInstance();
        break;
}

