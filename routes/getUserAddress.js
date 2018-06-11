let express = require('express');

let router = express.Router();

let getUser = require('../controller/getUser');

router.post('/',(req,res,next)=>{

	let userId = req.cookies.userID,
		options = [],
		select = {userId:userId};
		options.push(select);
		options.push(null);

		getUser(options).then(resolve=>{

			let user = resolve[0];

			let tempAddress = [];

			if(user){

				tempAddress = user.receiveAddress;
				
				if(tempAddress){
					res.json({
					status:0,
					msg:'地址查询成功',
					result:tempAddress
				})
			}
				
			}else{

				res.json({

					status:1,
					msg:'没有该用户',
					result:''

				})

			}

		}).catch(err=>{
			console.log(err);
			res.json({

				status:1,
				msg:'其他原因造成的错误',
				result:''

			})

		})

})

module.exports = router;