var express = require("express");
var router = express.Router();

var data = [];

router.get("/",function(req,res,next){
    if(req.session.data==undefined){
        req.session.data = [];
    }
    let opt = {
        title: "hello!",
        data: req.session.data
    }
    res.render('hello',opt);
});

router.post("/",function(req,res,next){
    req.session.data.unshift(req.body.msg);
    let opt = {
        title: "hello!",
        data: req.session.data
    }
    res.render('hello',opt);
});

module.exports = router;