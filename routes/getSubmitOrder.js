let express = require('express');

let router = express.Router();

let getUser = require('../controller/getUser');

router.post('/',(req,res,next)=>{

	let userId = req.cookies.userID;

	let options = [];

	let reqOrderId = req.body.orderId;

	let select = {userId:userId};

	options.push(select);
	options.push(null);

	getUser(options).then(resolve=>{

		let user = resolve[0];

		let getOrder = {};

		if(user){

			let orderList = user.orderList;
			
			orderList.forEach(item=>{

				if(item.orderId == reqOrderId){

					getOrder = item;

				}

			});

			let {orderId,createOrderDate,orderTotalMoney} = getOrder;

			res.json({

				status:0,
				msg:'当前订单查询成功',
				result:{orderId,createOrderDate,orderTotalMoney}

			})

		}else{

			res.json({

				status:1,
				msg:'没有该用户',
				result:'',

			})

		}

	}).catch(err=>{

		res.json({
			status:1,
			msg:'其他错误',
			result:err
		})

	})

})

module.exports  = router;