var mongoose = require('mongoose');
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var chapterSchema = new Schema({
    title: String,
    content: {
        type: String,
        required: true
    }
});

// 声明一个数据集 对象
var adminUser = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userSex: {
        type: String,
    },
    userImg: {
        type: String,
    },
    userEmail: {
        type: String,  
        unique: true,
        required: true              
    },
    superAdmin: {
        type: Boolean,
        default: false
    },
    userCollection: {           // 用户的收藏
        type: Array
    },
    userDownAPK: {              // 用户的下载
        type: Array
    },
    userAPKAdmin: {             // 用户的APK管理
        type: Array
    }
})


// 将数据模型暴露出去
module.exports = mongoose.model('users', adminUser);