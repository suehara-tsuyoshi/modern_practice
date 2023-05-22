const fs = require("fs");

function getfile(fname){
    return new Promise((resolve,reject)=>{
        fs.readFile(fname,(err,data)=>{
            resolve(data);
        });
    });
};

