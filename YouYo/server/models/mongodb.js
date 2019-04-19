var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yoyou');
var db = mongoose.connection;

// 连接成功
db.on('open', function () {
    console.log('MongoDB Connection Successed');
    console.log('MongoDB 连接成功');
    
});
// 连接失败
db.on('error', function () {
    console.log('MongoDB Connection Error');
    console.log('MongoDB 连接失败');    
});

exports.mongoose = mongoose;