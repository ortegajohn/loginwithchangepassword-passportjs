const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const database = require('../database/database_connection');
const {
    encryptPassword,
    matchPassword,
    encryptPasswordB
} = require('../lib/helper_pass');

passport.use('local.signin', new LocalStrategy({

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {

    const rows = await database.query("SELECT * FROM iStock_users WHERE username = ?", [username]);

    if (rows.length > 0) {

        const user = rows[0];
        const validPassword = await matchPassword(password, user.password);

        if (validPassword) {
            console.log("user: ", user)
            done(null, user, req.flash('success', 'Welcome user: ' + user.username));

        } else {

            done(null, false, req.flash('message', 'Incorrect password'));

        }

    } else {

        return done(null, false, req.flash('message', 'The username does not exists'));

    }

}));

passport.use('local.signup', new LocalStrategy({

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {

    const {
        firstname
    } = req.body;

    const {
        lastname
    } = req.body;

    const newUser = {
        username: username,
        password: password,
        first_name: firstname,
        last_name: lastname
    }

    newUser.password = await encryptPassword(password);

    const result = await database.query("INSERT INTO iStock_users SET ?", [newUser]);

    newUser.id = result.insertId;

    console.log(newUser);

    return done(null, newUser, req.flash('success', 'Welcome user: ', newUser.username));

}));

//Changepassword//Changepassword//
//Changepassword//Changepassword//
//Changepassword//Changepassword//



passport.use('local.changepassword', new LocalStrategy({

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {
    console.log("local.changepassword async (req, username, password, done)")
    const rows = await database.query("SELECT * FROM iStock_users WHERE username = ?", [username]);
    console.log("req.body:", req.body)

    if (rows.length > 0) {

        const user = rows[0];
        const validPassword = await matchPassword(password, user.password);


        if (validPassword) {
            console.log("user1: ", user)
            console.log("validPassword: ", validPassword);

            const newPassword = {
                username: username,
                oldpassword: password,
                newpassword: req.body.newpassword
            }
            const newPassword1 = {
                password: req.body.newpassword
            }
            database.query("SELECT * FROM iStock_users WHERE username = ?", [username], function(err, result) {
                if (err) {
                  throw err;
                }
            
                database.query("SELECT * FROM iStock_users WHERE username = ?", [username], function(err, result) {
                    if (err) {
                      throw err;
                    }
                    async function operation() {
                        return new Promise(function(resolve, reject) {
            
                            a = encryptPasswordB(newPassword1.password);
                    
                            // may be a heavy db call or http request?
                            resolve(a) // successfully fill promise
                        })
                    }
                    //https://stackoverflow.com/questions/47158979/node-wait-for-async-function-before-continue/47159391
                    async function app() {
                        var newPassword = await operation()
                        console.log("newPassword",newPassword)
            
                        database.query(
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

            done(null, user, req.flash('success', 'Change Password Successful For User: ' + user.username));

        } else {

            done(null, false, req.flash('message', 'Incorrect password'));

        }

    } else {

        return done(null, false, req.flash('message', 'The username does not exists'));

    }

}));



//Changepassword//Changepassword//
//Changepassword//Changepassword//
//Changepassword//Changepassword//



passport.serializeUser((user, done) => {

    done(null, user.id);

});

passport.deserializeUser(async (id, done) => {

    const rows = await database.query("SELECT * FROM iStock_users WHERE id = ?", [id]);
    done(null, rows[0]);

});