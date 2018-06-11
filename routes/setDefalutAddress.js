let express = require('express');

let router = express.Router();

let getUser = require('../controller/getUser')

router.post('/',(req,res,next)=>{
	
	let userId = req.cookies.userID;

	let addressId = req.body.params.addressId;

	let options = [];

	let select = {userId:userId};

	options.push(select);
	options.push(null);

	getUser(options).then(resolve=>{

		let user = resolve[0];

		if(user){

			let addressList = user.receiveAddress;
			addressList.forEach(item=>{

				if(item.addressId == addressId){

					item.isDefaultAddress = 1;

				}else{

					item.isDefaultAddress = 0;
					
				}

					
			})
			
		}else{

			res.json({

				status:1,
				msg:'没有该用户',
				result:''

			})

		}

		user.save((err,doc)=>{

			if(err) throw err;
			if(doc){
				res.json({

					status:0,
					msg:'设置成功',
					result:''

				})
			}else{

				res.json({

					status:1,
					msg:'设置失败',
					result:''

				})

			}

		})

	}).catch(err=>{

		res.json({

			status:1,
			msg:'其他方面出错',
			result:''

		})

	})
})

module.exports = router;