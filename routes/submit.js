let express = require('express');

let router = express.Router();

let getUser = require('../controller/getUser');


router.post('/',(req,res,next)=>{

	let userId = req.cookies.userID;

	let money = req.body.params.totalMoney;

	let options = [];

	let select = {userId:userId};

	options.push(select);
	options.push(null);

	getUser(options).then(resolve=>{

		let user = resolve[0];

		if(user){

			//生成订单详情
			let PreOrder = parseInt(Math.random()*100000)+100;

			let midOrder = Date.parse(new Date());

			let endOrder = parseInt(Math.random()*100000)+1000;

			let createOrderDate = (new Date()).toLocaleString();

			let orderId = PreOrder+""+midOrder+""+endOrder;

			let cartList = user.cart;

			let selectGoodsList = [];

			let address = [];

			let addressList = user.receiveAddress;

			cartList.forEach(item=>{

				if(item.checked == 1){

					selectGoodsList.push(item);

				}
			});

			addressList.forEach(item=>{

				if(item.isDefaultAddress == 1){

					address.push(item);

				}

			});

			let order={

				orderId:orderId,
				address:address,
				selectGoodsList:selectGoodsList,
				createOrderDate:createOrderDate,
				orderTotalMoney:money,
				orderStatus:1,

			};

			user.orderList.push(order);

			user.save((err,doc)=>{

				if(err){

					throw err;

				}
				if(doc){

					res.json({

						status:0,
						msg:'订单生成成功',
						result:orderId

					})

				}

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
			msg:'其他出错',
			result:err

		})

	})

})

module.exports = router;