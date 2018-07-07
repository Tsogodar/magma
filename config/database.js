//defaults ports: mongo - 27017 | mysql - 3306
const dbConfig = require('../magma').db;
switch (dbConfig.provider) {
    case 'mongodb':
        const mongoose = require('mongoose');
        const options = {
            useNewUrlParser: true,
            user: dbConfig.auth.username,
            pass: dbConfig.auth.password,
            auth:{
                authdb:"admin"
            },
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 10,
            bufferMaxEntries: 0
        };
        mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, options).then(
            () => {
                console.log(`Connected with MongoDB`)
            },
            error => {
                console.log(`Connection error: ${error}`)
            }
        );
        break;
    case 'mysql':
        const mysql = require('mysql');
        const connection = mysql.createConnection({
            host: dbConfig.host,
            port: dbConfig.port,
            database: dbConfig.database,
            user: dbConfig.auth.username,
            password: dbConfig.auth.password
        });

        connection.connect((error => {
            if (error) {
                console.log(`Connection error: ${error}`);
            } else {
                console.log(`Connected with MySQL`)
            }
        }));
        break;
}