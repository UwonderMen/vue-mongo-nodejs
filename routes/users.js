var express = require('express');
var router = express.Router();
let getUser = require('../controller/getUser.js');

/* GET users listing. */
router.post('/', function(req, res, next) {

	let condition = req.body.params
	let options=[];
	let select = {username:condition.username,password:condition.password};

	options.push(select);
	options.push(null)

	getUser(options).then(resolve=>{
		
		if(resolve.length == 0){
			res.json({
				status: 1,
			  	msg:'登陆失败',
			  	loginDate:new Date(),
			  	errorData:'未找到密码或者账号'
			})	
		}else{
			// req.session.user = resolve[0];
			res.cookie("userID",resolve[0].userId,{
				path:'/',
				maxAge:1000*60*60
			});

			res.cookie("nickName",resolve[0].nickName,{
				path:'/',
				maxAge:1000*60*60
			});
			
			res.json({
			status: 0,
		  	msg:'登陆成功',
		  	loginDate:new Date(),
		  	result:{nickName:resolve[0].nickName,userId:resolve[0].userId}
			})
		}
		
	}).catch(err=>{
			res.json({
				status: 1,
			  	msg:'登陆失败',
			  	loginDate:new Date(),
			  	errorData:err
			})		
	})

});

module.exports = router;
