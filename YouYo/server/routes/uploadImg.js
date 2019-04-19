var express = require('express');
var router = express.Router();
const multer = require('multer');
var FileUploadUtil = require('../routes/FileUploadUtil')
var User = require('../models/adminUser.js');


router.post('/uploadImg',FileUploadUtil('/image').any(),function(req,res){
    let destination = req.files[0].destination;
    let filename = req.files[0].filename;
    let convertPath = destination.substring(destination.indexOf('upload')-1,destination.length) +  filename;
    let params = {img_url:convertPath}
    res.send({params});
});

//导出对象
module.exports = router;
