let express = require('express')

let router = express.Router();

let getUser = require('../controller/getUser')

router.post('/',(req,res,next)=>{

	let userId = req.cookies.userID;

	let options  = [];

	let select = {userId:userId};

	options.push(select);

	options.push(null);

	getUser(options).then(resolve=>{

		let user = resolve[0];
		
		if(user){

			let cartList = user.cart;

			let counter = 0;

			cartList.forEach(item=>{

				counter += item.goodsNumber;

			}) 

			res.json({
				status:0,
				msg:'查询成功',
				result:counter
			})

		}else{

			res.json({
				status:1,
				msg:'没有该用户',
				result:''
			})
		}	

	}).catch(err=>{
		res.json({
			status:1,
			msg:'其他错误',
			result:''
		})
	})

})

module.exports = router;