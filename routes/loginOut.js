let express = require('express');
let router = express.Router();

router.post('/',(req,res,next)=>{

	res.cookie("userID","",{
		path:'/',
		maxAge:-1
	});

	res.cookie("nickName","",{
		path:'/',
		maxAge:-1
	});
	res.json({
		status:0,
		msg:'退出成功',
		result:''
	})
})

module.exports = router;