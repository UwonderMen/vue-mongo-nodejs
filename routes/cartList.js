let express = require('express')

let router = express.Router();

let getUser = require('../controller/getUser');


router.post('/',(req,res,next)=>{

	let userID = req.cookies.userID;

	let options = [];

	let select = {userId:userID};

	options.push(select);
	options.push(null);

	getUser(options).then(resolve=>{

		let user = resolve[0];

		if(user){

			let cartList = user.cart;

			res.json({

				status:0,

				msg:'查询成功',

				result:cartList
			})

		}else{

			res.json({

				status:1,

				msg:'查询失败',

				result:''
			})

		}

	})

})

module.exports = router;