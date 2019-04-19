var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var User = require('../models/adminUser.js');
var apkInfo = require('../models/apkInfo')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource 0');
});
// get test
router.get('/test', function(req, res, next) {
  res.send('respond with a resource 1');
  console.log('get success');
  
});

// 用户注册
router.post('/register', (req, res) => {
  // 获取用户提交的信息
  var postData = {
    userName: req.body.userName,
    password: req.body.password,
    userSex: req.body.userSex,
    userImg: req.body.userImg,
    userEmail: req.body.userEmail
  };
  console.log("postData", postData);
  // 查询是否被注册
  User.findOne({ userEmail: postData.userEmail }, (err, data) => {
    console.log("data", data);
    if (data != null) {
      res.send('该邮箱已被注册');
    } else {
        // 保存到数据库
        User.create(postData, (createErr, createData) => {
            if (createErr) throw createErr;
            console.log('您的注册成功');
            res.send('您的注册成功');
            // res.redirect(this.HOST + 'api/user/userList');      // 重定向到所用用户列表
        })
      }
  });
});
// 用户登录
router.post('/login', (req, res) => {
  if (req.body.userName != '') {      // 如果传过来用户名
    var postData = {
      userName: req.body.userName,
      password: req.body.password
    };
    var msg = {};
    User.findOne({
      userName: postData.userName,
      password: postData.password,
    }, (err, data) => {
      if(err) throw err;
      if (data) {
        msg.status = 'ok';
        msg.text = '登录成功';
        msg.userId = data._id;
        msg.userName = data.userName;
        msg.userEmail = data.userEmail;
        msg.userImg = data.userImg;
        msg.userSex = data.userSex;
        msg.superAdmin = data.superAdmin;
        msg.userCollection = data.userCollection;
      }else {
        msg.status = 'err';
        msg.text = '用户名或密码错误'
      }
      res.send({msg})
    })
  }else {       // 如果传过来邮箱
    var postData = {
      userEmail: req.body.userEmail,
      password: req.body.password
    };
    var msg = {};
    User.findOne({
      userEmail: postData.userEmail,
      password: postData.password,
    },function (err, data) {
      if(err) throw err;
      if (data) {
        msg.status = 'ok';
        msg.text = '登录成功';
        msg.userId = data._id;
        msg.userName = data.userName;
        msg.userEmail = data.userEmail;  
        msg.userImg = data.userImg;
        msg.userSex = data.userSex;     
        msg.superAdmin = data.superAdmin             
      }else {
        msg.status = 'err';
        msg.text = '邮箱或密码错误'
      }
      res.send({msg})
    })
  }
});
// 用户修改
router.post('/update', (req, res) => {
  let userName = req.body.userName;
  let userEmail = {userEmail: req.body.userEmail};
  let userImg = req.body.userImg;
  let userSex = req.body.userSex;
  let myUpdate = {userName, userImg, userSex}
  User.update(userEmail, myUpdate)
  .then(User => res.send('seccuss'))
  .catch(User => res.send('error'))
})
// 忘记密码
router.post('/forgetPassword', (req, res) => {
  console.log('forget');
  let userEmail = {userEmail: req.body.userEmail};
  let password = req.body.password;
  let myUpdate = {password};
  User.update(userEmail, myUpdate)
  .then(User => res.send('seccuss'))
  .catch(User => res.send('error'))
})

// POST收藏游戏
router.post('/gameCollection', (req, res) => {
  // 根据唯一的邮箱来查找
  let userEmail = {userEmail: req.body.userEmail};
  let gameId = req.body.gameId;     // 游戏的_id
  let userCollection = [];        // 存后台收藏数据的
  User.findOne(userEmail, (err, data) => {
    if(err) throw err;
    userCollection = data.userCollection;
    // 查重,取消收藏
    for(let i in userCollection){
      if (userCollection[i] == gameId) {
        // 删除重复_id，然后更新
        userCollection.splice(i,gameId.length);
        User.update(userEmail, {userCollection}, (err, data) => {
          if(err) {
            console.log(err);
          }else {
            // console.log(res);
            res.send('取消成功')
          }
        })
      }
    }
    // push成为一个新的数组
    userCollection.push(gameId)
    // 如果没有就添加
    User.update(userEmail, {userCollection}, (err, res) => {
      if (err) {
        console.log(err);
      }else {
        console.log('操作成功！');
      }
    })
  })
})

// post 下载游戏到数据库列表
router.post('/userDownAPK', (req, res) => {  
  // 根据唯一的邮箱来查找
  let userEmail = {userEmail: req.body.userEmail};
  let gameId = req.body.gameId;     // 游戏的_id
  let userDownAPK = [];        // 存后台数据的
  User.update(userEmail, {'$addToSet': {'userDownAPK': gameId}}, (err, data) => {
    if (err) {
      console.log(err);
    }else {
      res.send('success')
    }
})

})

// postAPK管理列表



// 查询用户收藏的游戏
router.post('/allCollection', function(req, res, next) {
  let collection = [];
  collection = JSON.parse(req.body.userCollection)
  apkInfo.find({_id: {$in: collection}}, (err, data) => {
    if (err) throw err;
    res.send(data)
  })
});

// 查询用户下载的游戏
router.post('/userDownGame', function(req, res, next) {
  var userEmail = req.body.userEmail;
  User.findOne({userEmail: userEmail}, (err, data) => {
    var userArray = [];
    userArray = JSON.stringify(data.userDownAPK);
    userArray = JSON.parse(userArray)
    apkInfo.find({_id: {$in: userArray}}, (err, data) => {
      if (err) throw err;
      res.send(data)
    })
  })
});

// 部分删除下载list
router.post('/removeOne', function(req, res, next) {
  console.log(req.body);
  let userEmail = {userEmail: req.body.userEmail};
  let apkId = req.body.apkId;     // 游戏的_id
  // let userDownAPK = [];        // 存后台数据的
  User.update(userEmail, {'$pull': {'userDownAPK': apkId}}, (err, data) => {
    if (err) {
      console.log(err)
    }else {
      console.log('success==============');
      
      res.send('success')
    }
  })
});

// 查询用户APK管理
router.post('/userAPKAdmin', function(req, res, next) {
  let APKAdmin = [];
  APKAdmin = JSON.parse(req.body.userAPKAdmin)
  apkInfo.find({_id: {$in: APKAdmin}}, (err, data) => {
    if (err) throw err;
    res.send(data)
  })
});

// 获取用户信息
router.post('/getUserInfo', function(req, res, next) {
  User.find({userEmail: req.body.userEmail}, (err, data) => {
    if (err) throw err;
    res.send(data)
  })
});






module.exports = router;
