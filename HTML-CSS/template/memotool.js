const fs = require("fs");
const rl = require('./getline.js');

var data = [];
var fname = './message.txt';

async function main(){
    var opt = {encoding:'utf8'};
    var bf = fs.readFileSync(fname,opt);
    data = JSON.parse(bf.toString('utf8'));

    while(true){
        var cmd = await rl.getline('cmd(a/d/f/q)');
        switch(cmd){
            case 'a':
                await add();
                break;
            case 'd':
                await del();
                break;
            case 'f':
                await find();
                break;
            case 'q':
                quit();
                return;
            default:
                console.log('no-command');
        }
    }
}

async function add(){
    var bf = await rl.getline('type message: ');
    var msg = bf.toString('utf8');
    var item ={date:new Date(),message: msg};
    data.unshift(item);
    console.log("message added");
}

async function del(){
    var bf = await rl.getline('type number: ');
    var num = bf.toString()*1;
    console.log('item: '+data[num].message);
    bf = await rl.getline('delete it? (y/n):');
    if(bf.toString()=='y'){
        data.splice(num,1);
    }
}

async function find(){
    var bf = await rl.getline('find: ');
    var find = bf.toString('utf8');
    for(var i in data){
        if(data[i].message.indexOf(find)>-1){
            console.log(i + ':' + data[i].message);
        }
    }
}

function quit(){
    var opt = {encoding:'utf8'};
    fs.writeFileSync(fname,JSON.stringify(data),opt);
    console.log("quit now!");
}

main();