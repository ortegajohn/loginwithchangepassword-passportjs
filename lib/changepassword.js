const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const database = require('../database/database_connection');
const {
    encryptPassword,
    matchPassword,
    encryptPasswordB
} = require('../lib/helper_pass');
const mysql = require( 'mysql' );
connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "istock_db"
  });

// const rows = database.query("SELECT * FROM iStock_users WHERE username = ?", ["a"],function(){

// });

connection.query("SELECT * FROM iStock_users WHERE username = ?", ["a"], function(err, result) {
    if (err) {
      throw err;
    }

    connection.query("SELECT * FROM iStock_users WHERE username = ?", ["a"], function(err, result) {
        if (err) {
          throw err;
        }
        async function operation() {
            return new Promise(function(resolve, reject) {

                a = encryptPasswordB("b");
        
                // may be a heavy db call or http request?
                resolve(a) // successfully fill promise
            })
        }
        //https://stackoverflow.com/questions/47158979/node-wait-for-async-function-before-continue/47159391
        async function app() {
            var newPassword = await operation()
            console.log("newPassword",newPassword)

            connection.query(
                "UPDATE iStock_users SET ? WHERE ?",
                [
                    {
                        password: newPassword
                    },
                    {
                        username: result[0].username
                    }
                ], function(err, result) {
                    if (err) {
                        throw err;
                      }
                      console.log("result: ", result)
    
                }
            )
        }
        
        app()

    });
    console.log(result[0].username)
  });

