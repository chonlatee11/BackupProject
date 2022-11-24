var express = require('express') // ส่งข้อมูล
var cors = require('cors') 
var app = express()

var bodyParser = require('body-parser') // รับ json
var jsonParser = bodyParser.json()

app.use(cors())

var mysql = require("mysql"); // ต่อ database
var poolCluster = mysql.createPoolCluster();
poolCluster.add("node0", {
  host: "127.0.0.1",
  port: "3306",
  database: "myDB",
  user: "dev",
  password: "dev101",
  charset: "utf8mb4",
});

app.post('/register', jsonParser,  function (req, res, next) {
    poolCluster.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
      } else {
        connection.query("CREATE TABLE `myDB`.`User` (`UserID` INT NOT NULL AUTO_INCREMENT , `UserName` VARCHAR(12) NOT NULL , `Password` TEXT NOT NULL , `fName` TEXT NOT NULL , `lName` TEXT NOT NULL , `PhoneNumber` TEXT NOT NULL , `Address` TEXT NOT NULL , PRIMARY KEY (`UserID`)) ENGINE = InnoDB CHARSET=utf8mb3 COLLATE utf8mb3_general_ci;", function (err, rows) {
          if (err) {
            res.json({err})
          } else {
            connection.release();
        res.json({rows})
          }
        });
      }
    });
  })

  app.post('/inserttable', jsonParser,  function (req, res, next) {
    poolCluster.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
      } else {
        connection.query("CREATE TABLE `myDB`.`Admin` (`adminID` INT NOT NULL AUTO_INCREMENT , `Email` TEXT NOT NULL , `passWord` TEXT NOT NULL , `fName` TEXT NOT NULL , `lName` TEXT NOT NULL, PRIMARY KEY (`adminID`)) ENGINE = InnoDB CHARSET=utf8mb3 COLLATE utf8mb3_general_ci;", function (err, rows) {
          if (err) {
            res.json({err})
          } else {
            connection.release();
        res.json({rows})
          }
        });
      }
    });
  })


  app.listen(3030, function () {
    console.log('CORS-enabled web server listening on port 3030')
  })