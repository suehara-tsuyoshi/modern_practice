exports.getRow = function(sql){
    let sqlite3 = require('sqlite3');
    let db = new sqlite3.Database('todo.db');

    return new Promise((resolve,reject)=>{
        db.get(sql,(err,row)=>{
            resolve(row);
        });
    });
}