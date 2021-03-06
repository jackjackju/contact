const pool = require("../db");

//search for a single user
function searchUser (username) {
    return new Promise((resolve, reject) => {
        pool.all("select * from users where username=?", [username], function(err,rows) {
            if(err) {
                reject (err);
            } else {
                resolve(rows);
            }
        });
    });
}

//search for a single user based on user id
function searchUserID (user_id) {
    return new Promise((resolve, reject) => {
        pool.all("select * from users where user_id=?", [user_id], function(err,rows) {
            if(err) {
                reject (err);
            } else {
                resolve(rows);
            }
        });
    });
}

//create new user
function insertUser (username, password, email) {
    return new Promise((resolve, reject) => {
        pool.run("insert into users(username, password, email) values (?, ?, ?)", [username, password, email], function(err,rows) {
            if(err) {
                reject (err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {insertUser, searchUser, searchUserID};
