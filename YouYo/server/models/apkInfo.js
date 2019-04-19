var mongoose = require('mongoose');
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var apkSchema = new Schema ({
    apkName: {                  // 游戏名字
        type: String,
        required: true
    },
    apkPath: {              // 存储路径
        type: String,
        required: true
    },
    apkSize: {              // apk文件大小
        type: Number,
        required: true        
    },
    apkManufacturer: {              // 厂商
        type: String,
        required: true
    },
    apkIcon: {                  // 游戏图标
        type: String,
        required: true
    },
    apkImg: {                   // 游戏截图
        type: Array,
        required: true
    },
    apkCreate: {                // 创建时间
        type: Date,
        default: Date.now()
    },
    apkOrXapk: {                
        type: String,
        required:true
    },
    apkIntroduce: {             // 介绍
        type: String,
        required: true
    },
    apkLabel: {         // 游戏标签（类型）
        type: Array,
        required: true
    },
    apkStar: {              // 游戏评分
        type: Array,
        required: true
    }
});

// 将数据模型暴露出去
module.exports = mongoose.model('apkInfo', apkSchema);