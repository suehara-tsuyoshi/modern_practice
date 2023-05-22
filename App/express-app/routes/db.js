var express = require("express");
var router = express.Router();

var dbutil = require("../db/all.js");

router.get('/',async (req,res,next)=>{
    let sql = 'SELECT * FROM persondata';
    let rows = await dbutil.getAllRows(sql);
    let opt = {
        title: 'Hello!',
        sql: sql,
        data: rows
    }
    res.render('db',opt);
});

router.post('/',async(req,res,next)=>{
    let sql = req.body.sql;
    let rows = await dbutil.getAllRows(sql);
    let opt = {
        title: 'Hello!',
        sql: sql,
        data: rows
    }
    res.render('db',opt);
});

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('mydata.db');

router.get('/add',async (req,res,next)=>{
    let opt = {
        title: 'Hello!'
    }
    res.render('db/create',opt);
});

router.post('/add',async (req,res,next)=>{
    let name = req.body.name;
    let mail = req.body.mail;
    let sql = 'insert into persondata (name,mail) values("'+ name+'","'+mail+'");';
    db.exec(sql,(stat,err)=>{
        res.redirect('/db');
    });
});

let dbget = require('../db/get.js');

router.get('/edit', async(req,res,next)=>{
    let id = 1;
    if(req.query.id!=undefined){
        id = req.query.id;
    }
    let sql = 'select * from persondata where id ='+id;
    let rec = await dbget.getRow(sql);
    let opt = {
        title: 'Hello!',
        data: rec
    }
    res.render('db/edit',opt);
});

router.post('/edit',async(req,res,next)=>{
    let id = req.body.id;
    let name = req.body.name;
    let mail = req.body.mail;
    let sql = 'update persondata set name = "' + name + '", mail ="' + mail +'" where id =' + id;
    db.exec(sql,(stat,err)=>{
        res.redirect('/db');
    });
});

router.get('/del', async(req,res,next)=>{
    let id = 1;
    if(req.query.id!=undefined){
        id = req.query.id;
    }
    let sql = 'select * from persondata where id ='+id;
    let rec = await dbget.getRow(sql);
    let opt = {
        title: 'Hello!',
        data: rec
    }
    res.render('db/del',opt);
});

router.post('/del',async(req,res,next)=>{
    let id = req.body.id;
    let sql = 'delete from persondata where id =' + id;
    db.exec(sql,(stat,err)=>{
        res.redirect('/db');
    });
});



module.exports = router;