let express = require('express');

let router = express.Router();

let getUser = require('../controller/getUser');

router.post('/',(req,res,next)=>{

	let userId = req.cookies.userID;

	let options = [];

	let select = {userId:userId};

	options.push(select);
	options.push(null);

	getUser(options).then(resolve=>{

		let user = resolve[0];

		if(user){

			let Tempaddress = {};
			let addressList = user.receiveAddress;

			addressList.forEach(item=>{

				if(item.isDefaultAddress == 1){

					Tempaddress = item;
				}

			})

			res.json({

				status:0,
				msg:'被选中地址查询成功',
				result:Tempaddress

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
			msg:'其他原因出错',
			result:err

		})

	})

})

module.exports = router;