let express = require('express');

let router = express.Router();

let getUser = require('../controller/getUser');

let User = require('../model/User');

let updateUserCart= require('../controller/updateUser');


router.post('/',(req,res,next)=>{

	let goodsId = req.body.params.goodsId;

	let userId = req.cookies.userID;

	let options = [];

	let select = {userId:userId};

	let delSelect = {$pull:{cart:{id:goodsId}}};

	let delOptions = [];

	options.push(select);
	options.push(null);

	delOptions.push(select)
	delOptions.push(delSelect);

	getUser(options).then(resolve=>{

		let user = resolve[0];

		if(user){

			return updateUserCart(delOptions);

		}else{

			res.json({

				status:1,
				msg:'未登录或者帐号密码错误',
				result:''

			})

		}

	}).then(resolve1=>{


		if(resolve1.ok ===1){
			
			res.json({

				status:0,
				msg:'删除成功',
				result:'ok'
			})

		}else{

			res.json({

				status:1,
				msg:'删除失败',
				result:'err'
			})

		}

	}).catch(err=>{

		res.json({

			status:1,
			msg:err,
			result:''

		})
	})

})

module.exports = router;