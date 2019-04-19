var express = require('express');
var router = express.Router();
var apkInfo = require('../models/apkInfo.js');
var User = require('../models/adminUser');


// 动态get游戏
router.get('/allInfo', function(req, res, next) {
    apkInfo.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    }).sort({"apkCreate": -1})
    console.log('get success');
});

// 游戏详情
router.get('/gameIntro/:_id', function(req, res, next) {    
    var Collection = false;
    var myData = {};
    // 是否收藏
    User.find({userCollection: req.params._id}, (err, data) => {
        if (err) {
            console.log(err);
        }else {
            console.log(data.length);
            if (data.length == 0) {
                Collection = false
            }else {
                Collection = true
            }
        }
    })
    // 游戏信息
    apkInfo.findOne({ _id: req.params._id}, (err, data) => {
        if (err) throw err;
        myData = data.toObject();
        myData.myCollection = Collection;
        res.send(myData)
    })
    console.log('get success');
});

// 根据标签查询
router.get('/gameAlike/:lable', function(req, res, next) {
    console.log(req.params.lable);
    
    apkInfo.find({apkLabel: req.params.lable}, (err, data) => {
        if (err) throw err;
        res.send(data)
    }).limit(10)
    console.log('get success');
});

// 根据厂商查询
router.get('/gameManufacturer/:Manufacturer', function(req, res, next) {
    console.log(req.params.lable);
    
    apkInfo.find({apkManufacturer: req.params.Manufacturer}, (err, data) => {
        if (err) throw err;
        res.send(data)
    }).limit(10)
    console.log('get success');
});

// 猜你喜欢
router.get('/likeYou', function(req, res, next) {
    apkInfo.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    }).sort({"apkCreate": -1}).limit(10)
    console.log('get success');
});

// 分类查询
router.get('/classQuery/:className', function(req, res, next) {
    apkInfo.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    }).sort({"apkCreate": -1})
    console.log('get success');
});

// 榜单查询
router.get('/topList', function(req, res, next) {
    apkInfo.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    }).sort({"apkStar": -1})
    console.log('get success');
});

// 其它标签查询
router.get('/otherLable/:lable', function(req, res, next) {
    console.log(req.params.lable);
    
    apkInfo.find({apkLabel: req.params.lable}, (err, data) => {
        if (err) throw err;
        res.send(data)
    }).sort({"apkCreate": -1})
    console.log('get success');
});

// 搜索
router.post('/search', (req, res) => {
    let str = req.body.searchContent;
    let reg = new RegExp(str, 'i')          // i表示不区分大小写
    apkInfo.find({$or: [{apkName : {$regex : reg}}]}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
    console.log('post success');
})

  module.exports = router;
  