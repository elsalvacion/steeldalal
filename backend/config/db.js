const mysql = require("mysql");
let connection;
try {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    multipleStatements: true,
    timeout: 60000,
  });

  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
} catch (error) {
  console.log(error);
}

module.exports = connection;
