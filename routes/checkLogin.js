let express = require('express');

let router = express.Router();

router.post('/',(req,res,next)=>{

	if(req.cookies.userID){
		res.json({
			status:0,
			msg:'',
			result:{nickName:req.cookies.nickName}
		})

	}else{
		res.json({
			status:1,
			msg:'未登录',
			result:''
		})
	}
})

module.exports = router;