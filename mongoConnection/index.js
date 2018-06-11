const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/market",function(err){
	if(err){
		console.log("-----------数据库连接失败----------"+err)

	}else{
		console.log("------------数据库连接成功-------");
	}

});
