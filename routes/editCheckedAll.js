let express = require('express');

let router = express.Router();

let getUser = require('../controller/getUser');

router.post('/',(req,res,next)=>{

	let checkedAll = req.body.params.checkedAll;

	let userId = req.cookies.userID;

	let options = [];

	let select = {userId:userId};

	options.push(select);

	options.push(null);
	console.log(checkedAll);
	getUser(options).then(resolve=>{

		let user = resolve[0];

		if(user){

			user.cart.forEach((item)=>{

				item.checked = checkedAll;
				
			})

			user.save((err,doc)=>{

				if(err) throw err;

				res.json({

					status:0,
					msg:'全选成功',
					resilt:'success'
				})

			})
		}else{

			res.json({

				status:1,
				msg:'用户查询失败',
				resilt:'err'
			})

		}

	}).catch(err1=>{

			res.json({

				status:1,
				msg:'其他出错',
				resilt:err1
			})

	})

})

module.exports = router;