let express = require('express');

let router = express.Router();

let getUser = require('../controller/getUser');

let delAllGoods = require('../controller/updateUser');

router.post('/',(req,res,next)=>{

	let userId = req.cookies.userID;

	let options = [];

	let select ={userId:userId};

	let delSelect = {$pull:{cart:{}}};

	let delAlloptions = [];

	options.push(select);

	options.push(null);

	delAlloptions.push(select);

	delAlloptions.push(delSelect);



	getUser(options).then(resolve=>{

		let user = resolve[0];

		if(user){

			return delAllGoods(delAlloptions);

		}else{

			res.json({

				status:1,
				msg:'用户查询失败',
				result:'error'

			})

		}

	}).then(resolve1=>{

		res.json({

				status:0,
				msg:'全删成功',
				result:'success'

			})


	}).catch(err=>{

		res.json({

			status:1,
			msg:'其他原因造成出错',
			result:'err'

		})

	})

})

module.exports = router;




