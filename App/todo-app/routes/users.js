var express = require('express');
var router = express.Router();

var dbget = require('../db/get.js');
var dball = require('../db/all.js');
var dbdo = require('../db/exec.js');


/* login page*/
router.get('/login',function(req,res,next){
  let opt = {
    title: 'Login',
    login: req.session.login,
  };
  res.render('login',opt);
});

router.post('/login',async function(req,res,next){
  let account = req.body.account;
  let pass = req.body.password;
  let sql = "select * from users where account ='" + account +"' and password='" + pass + "'";
  let record = await dbget.getRow(sql);
  if(record != undefined){
    req.session.login = record;
  }else{
    res.redirect('/users/login');
  }
  res.redirect('/');
});

/* logout */
router.get('/logout',function(req,res,next){
  req.session.login = undefined;
  res.redirect('/users/login');
});

/* admin(add) */
router.get('/admin',async function(req,res,next){
  if(req.session.login == undefined){
    res.redirect('/users/login');
  }
  if(req.session.login.role != 'admin'){
    res.redirect('/users/login');
  }
  let opt = {
    title: 'Admin',
    login: req.session.login,
  };
  res.render('admin',opt);
});

router.post('/admin',async function(req,res,next){
  let account = req.body.account;
  let pass = req.body.password;
  let name = req.body.name;
  /*let sql = 'insert into users (account,password,name,role) values("'+
  account+'","'+pass+'","'+name+'","user")';*/
  let sql = "insert into users (account, password, name, role) values('" + account + "','" + pass + "','" + name + "','user')";
  await dbdo.exec(sql);
  let opt = {
    title: 'Admin',
    login: req.session.login,
  };
  res.render('admin',opt);
});

/* admin2 */
router.get('/admin2',async function(req,res,next){
  if(req.session.login == undefined){
    res.redirect('/users/login');
  }
  if(req.session.login.role != 'admin'){
    res.redirect('/users/login');
  }
  let sql = 'select * from users';
  let records = await dball.getAllRows(sql);
  let opt = {
    title: 'Admin2',
    login: req.session.login,
    data: records,
  };
  res.render('admin2',opt);
});

/*delete user*/
router.get('/del_usr',async function(req,res,next){
  if(req.session.login == undefined){
    res.redirect('/users/login');
  }
  if(req.session.login.role != 'admin'){
    res.redirect('/users/login');
  }
  let id = req.query.id;
  let sql = 'delete from users where id=' + id;
  await dbdo.exec(sql);
  res.redirect('/users/admin2');
});
module.exports = router;
