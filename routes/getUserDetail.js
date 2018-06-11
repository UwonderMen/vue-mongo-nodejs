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

			let tempUser = {};
			tempUser['nickName'] = user.nickName;
			tempUser['avatar'] = user.avatar;
			tempUser['material'] = user.material;
			tempUser['place'] = user.place;
			tempUser['likeFruitType'] = user.likeFruitType;
			tempUser['likeFruit'] = user.likeFruit;
			tempUser['myLove'] = user.myLove;
			tempUser['constellatory'] = user.constellatory;
			tempUser['age'] = user.age;
			tempUser['fans'] = user.fans;
			tempUser['follow'] = user.follow;

			res.json({
				status:0,
				msg:'查询成功',
				result:tempUser

			})

		}else{

			res.json({

				status:1,
				msg:'没用该用户',
				result:''

			})

		}

	}).catch(err=>{
		console.log(err);
		res.json({

			status:1,
			msg:'其他错误',
			result:err

		})

	})
})

module.exports = router;