const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({

    host: "localhost",
    user: "haxor07",
    port: 3306,
    password: "uDEMYleaks@@07",
    database: "udemy",
    multipleStatements: true

});

mysqlConnection.connect((err) => {

  if(!err)
  {
    console.log("Connected Successfully");
  }
  else
  {
    console.log("Connection Failed" + err.message);
  }

});

module.exports = mysqlConnection;
