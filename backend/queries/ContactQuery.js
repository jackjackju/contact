const pool = require("../db");

function searchContact (user_id) {
    return new Promise((resolve, reject) => {
        pool.all("select * from contacts where owner=?", [user_id], function(err,rows) {
            if(err) {
                reject (err);
            } else {
                resolve(rows);
            }
        });
    });
}

function searchContactDuplication (name, user_id) {
    return new Promise((resolve, reject) => {
        pool.all("select * from contacts where owner=? and name=?", [user_id, name], function(err,rows) {
            if(err) {
                reject (err);
            } else {
                resolve(rows);
            }
        });
    });
}

function insertContact (name, phone, email, owner) {
    return new Promise((resolve, reject) => {
        pool.run("insert into contacts(name, phone, email, owner) values (?, ?, ?, ?)", [name, phone, email, owner], function(err,rows) {
            if(err) {
                reject (err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {searchContact, insertContact, searchContactDuplication};
