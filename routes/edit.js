//修改购物车里商品的数量和被选中状态
let express = require('express');

let router = express.Router();

let getUser = require('../controller/getUser');

let updateUser = require('../controller/updateUser');

router.post('/',(req,res,next)=>{

	let goodsNumber = req.body.params.goodsNumber,
		userId = req.cookies.userID,
		goodsId = req.body.params.goodsId,
		checked = req.body.params.checked,
		goodsOptions = [],
		userOptions = [],
		userSelect = {userId:userId},
		goodsSelect = {userId:userId,"cart.id":goodsId},
		goodsCondition = {"cart.$.goodsNumber":goodsNumber,"cart.$.checked":checked};


		userOptions.push(userSelect);
		userOptions.push(null);

		goodsOptions.push(goodsSelect);
		goodsOptions.push(goodsCondition);

		getUser(userOptions).then(resolve=>{

			let user = resolve[0];

			if(user){

				return updateUser(goodsOptions);

			}else{

				res.json({
					status:1,
					msg:'用户查询失败',
					result:'userErr'
				})

			}

		}).then(resolve1=>{

			if(resolve1.ok === 1){

				res.json({
					status:0,
					msg:'修改成功',
					result:'successs'
				})

			}else{

				res.json({
					status:1,
					msg:'修改失败',
					result:'editError'
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