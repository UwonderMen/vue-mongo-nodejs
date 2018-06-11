let express = require('express');
let getGood = require('../controller/getGoodsList');
let getUserOne = require('../controller/getUser');
let Users = require('../model/User.js');
let router = express.Router();

router.post('/',(req,res,next)=>{

	let condition = req.body.params;
	let optionsGood = [];
	let optionsUser = [];
	let goodSelect = {id:condition.id};
	let userSelect = {userId:req.cookies.userID}
	let goods = null;

	optionsGood.push(goodSelect);
	optionsGood.push(null);

	optionsUser.push(userSelect);
	optionsUser.push(null);

	getGood(optionsGood).then(result=>{
		
		goods = result[0];

		goods.checked = 1;

		goods.goodsNumber = 1;

		return getUserOne(optionsUser);

	}).then(res1=>{

		let user = res1[0];

		let goodItem = null;

		if(user){

			let cartList = user.cart;

			cartList.forEach((item,index,arr)=>{

				if(item.id === goods.id){

					goodItem = item;

					item.goodsNumber++;

				}
			})

			if(goodItem){

				user.save((err1,doc)=>{

					res.json({

						status:0,

						msg:'加入成功',

						result:'Success'

					})

				});

			}else{

				cartList.push(goods);

				user.save((err1,doc)=>{

					res.json({

						status:0,

						msg:'加入成功',

						result:'Success'

					})

				});
			}
		}

		}).catch(err=>{

			res.json({

				status:1,

				msg:'出错',

				result:''

			})

		})

	})

module.exports = router;