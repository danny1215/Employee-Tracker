const mysql = require('mysql');
const connectionProperties = require('./connectionProperties')

const connection = mysql.createConnection(connectionProperties);

    connection.connect((err) => {
        if (err) {
            console.log(chalk.white.bgRed(err));
            return;
        }
        console.log(`Connected to db. ThreadID: ${connection.threadId}`);
    
  })


module.exports = connection;
