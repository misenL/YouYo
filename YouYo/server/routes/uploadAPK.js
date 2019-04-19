var express = require('express');
var router = express.Router();
var apkInfo = require('../models/apkInfo.js');
const multer = require('multer');
var fs = require("fs");
var path = require("path");

var upload = multer();


// 多文件上传
router.post('/uploadAPK', multer({
  //设置文件存储路径
  dest: 'public/uploadAPK'
}).array('file', 10), function (req, res, next) {  //这里10表示最大支持的文件上传数目
  let files = req.files;
  if (files.length === 0) {
      res.render("error", {message: "上传文件不能为空！"});
      return
  } else {
    // console.log('==============>');        
    // console.log(req.body.apkLabel);
    // console.log(req.body.apkLabel.length);
    let fileInfos = {};
    let gameImg = [];         /// 游戏截图
    let pathUrl = 'http://localhost:3000/uploadAPK/';

    fileInfos.apkName = req.body.apkName;
    fileInfos.apkManufacturer = req.body.apkManufacturer ;
    fileInfos.apkOrXapk = req.body.apkOrXapk ;
    fileInfos.apkIntroduce = req.body.apkIntroduce ;
    fileInfos.apkLabel = req.body.apkLabel ;
    fileInfos.apkStar = req.body.apkStar ;

    for (var i in files) {
        let file = files[i];
        // 修改名字
        fs.renameSync('./public/uploadAPK/' + file.filename, './public/uploadAPK/' + file.originalname);//这里修改文件名。
    }
    console.log(files[0]);
    
    fileInfos.apkPath = pathUrl + files[0].originalname;    // apk文件路径
    fileInfos.apkSize = files[0].size/1048576;    // apk文件大小    
    fileInfos.apkIcon = pathUrl + files[1].originalname     // 游戏图标
    // 游戏截图路径
    for (let i = 2; i < files.length; i++){
      gameImg.push(pathUrl + files[i].originalname)
    }
    fileInfos.apkImg = gameImg;
    console.log('==============>');    
    console.log(fileInfos);
    // 信息存到数据库
    apkInfo.create(fileInfos, (createErr, createData) => {
      if (createErr) throw createErr;
      console.log('存储成功！');
    })
    
    // 设置响应类型及编码
    res.set({
        'content-type': 'application/json; charset=utf-8'
    });
    res.send(fileInfos);
}
});

// 文件下载
router.get('/downApk/:myAppName', (req, res, next) => {
  console.log('/downApk================');
  var name = req.params.myAppName;
  let myPath = process.cwd() + '/public/uploadAPK/'+name
  res.download(myPath, name, (err)=>{
    console.log('OK');
  })
})




//导出对象
module.exports = router;
