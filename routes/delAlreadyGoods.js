let express = require('express');

let router = express.Router();

let getUser = require('../controller/getUser');

let updateUser = require('../controller/updateUser');

router.post('/',(req,res,next)=>{

	let userId = req.cookies.userID;

	let options = [];

	let select = {userId:userId};

	let PromiseList = [];



	options.push(select);
	options.push(null);

	getUser(options).then(resolve=>{

		let user = resolve[0];

		if(user){

			let cartList = user.cart;

			cartList.forEach(item=>{

				if(item.checked === 1){

					let goodsId = item.id;

					let delSelect = {$pull:{cart:{id:goodsId}}};

					let delOptions = [];

					delOptions.push(select)

					delOptions.push(delSelect);

					let pro = updateUser(delOptions);

					PromiseList.push(pro)

				}

			})
			console.log(PromiseList);
			return Promise.all(PromiseList);

		}else{

			res.json({

				status:1,
				msg:'没有该用户',
				result:''

			})

		}

	}).then(resolve1=>{

		console.log(resolve1);

		if(resolve1[0].ok ===1){

			res.json({
				status:0,
				msg:'已成功删除购物车已购买物品',
				result:''
			})

	}
		
	}).catch(err=>{

		console.log(err);

		res.json({

			status:1,
			msg:'其他错误',
			result:err,

		})

	})

})

module.exports = router;
