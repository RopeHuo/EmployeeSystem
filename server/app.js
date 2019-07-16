var url = require("url");
var express = require("express");
var mongoose = require("mongoose");
var formidable = require('formidable');
var session = require('express-session'); //引入session包

var app = express();

//**********开启session*********** */
app.set('trust proxy', 1);
app.use(session({
    secret: 'Huo',
    resave: false,
    cookie: {}
}))
//**********开启session*********** */

//引入表结构
var UserInfo = require("./models/UserInfo")
var Login = require("./models/Login")
//连接数据库
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/project", { useMongoClient: true })

app.post("/login",function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req,(err,data)=>{
        const username = data.age
        const password = data.pass
        Login.create({
            username,
            password
        },function (err) {
            //登陆成功，下发session值，表示这个用户登陆过了。
                req.session.login = true;
                req.session.username = username;
            res.json({ result: 1 })
        })
    })
        
})
//添加信息
app.post("/adduser", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, data) => {
        //后端得到用户传过来的信息
        const id = parseInt(Math.random() * 100)
        const name = data.name
        const date = data.date1
        const sex = data.resource
        const address = data.address
        const tel = data.tel
        const age = data.age
        //后端得到用户传过来的信息
        UserInfo.create({
            id,
            name,
            age,
            tel,
            address,
            date,
            sex
        }, function (err) {
            res.json({ result: 1 })
        })

    });
})
//删除信息
app.delete("/deluser", function (req, res) {
    var obj = url.parse(req.url, true).query;
    UserInfo.find({ id: obj.id }).exec(function (err, data) {
        var del = data[0]
        del.remove()
    })
})
//搜索信息
app.get("/search",function(req,res){
    const {name} = url.parse(req.url, true).query
    UserInfo.find({ name}).exec(function(err,data) {
        userinfo = data
        res.json(userinfo)
    })
})

//返回用户所有数据
app.get("/list", (req, res) => {
    UserInfo.find().sort({ "id": 1 }).exec((err, data) => {
        res.json({ "result": data })
    })
})
//检查是否登陆，给前端的路由守卫验证
app.get("/checklogin", function (req, res) {
    if (req.session.login) {
        res.json({
            login: req.session.login,
            username: req.session.username,
        })
    } else {
        res.json({ "login": false })
    }
})

app.get("/topstories.json",function (req,res) {
    res.json([1234567, 1234567, 1234567, 1234567, 1234567, 1234567, 1234567, 1234567, 1234567])
})










app.listen(3000);

