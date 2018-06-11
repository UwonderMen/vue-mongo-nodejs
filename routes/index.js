var express = require('express');
var router = express.Router();
var getFruits = require("../controller/getGoodsList.js");
var mongo = require('../mongoConnection/index.js')

router.get('/fruits', (req, res, next)=> {
	let options=[];
	let condition = req.query;
	let pageCount = 9;
	let page = parseInt(condition.page);
	let skipCount = (page-1)*pageCount;
	let sort = parseInt(condition.sort);
	let selectCondition = {};
	let fenleiFlag = parseInt(condition.fenlei);
	let fruitType = condition.fruitType;
	let sortOrLimit ={sort:{price:sort},limit:pageCount,skip:skipCount};
	switch (fenleiFlag) {
		case 1:
			selectCondition = {price:{$gte:0.0,$lte:8.0}}
			break;
		case 2:
			selectCondition = {price:{$gt:8.0,$lte:16.0}}
			break;
		case 3:
			selectCondition = {price:{$gt:16.0,$lte:24.0}}
			break;
		case 4:
			selectCondition = {price:{$gt:24.0,$lte:50.0}}
			break;
		default:
			break;
	}
	switch(fruitType){
		case '1':
			selectCondition.flavourType = '温性水果';
			break;
		case '2':
			selectCondition.flavourType = '热性水果';
			break;
		case '3':
			selectCondition.flavourType = '寒性水果';
			break;
	}	
	options.push(selectCondition);
	options.push(null);
	options.push(sortOrLimit);

	 getFruits(options).then(resolve=>{
		  res.json({
		  	status:'0',
		  	msg:'成功',
		  	count:resolve.length,
		  	assortment:['All','00.00 - 08.00','08.00 - 16.00','16.00 - 24.00','24.00 - 50.00'],
		  	result:resolve
		  });
	 }).catch(err=>{
	 	 res.json({
		  	status:'1',
		  	msg:'失败',
		  	count:0,
		  	assortment:'',
		  	result:err
		  });
	 })
});

router.get('/getFruitDetail',(req,res,next)=>{
	let id = req.query.id;
	let options = [];
	let selectCondition = {id:id};
	options.push(selectCondition);
	options.push(null);

	getFruits(options).then(resolve=>{
		res.json({
			status:'0',
		  	msg:'成功',
		  	count:resolve.length,
		  	result:resolve
		})
	}).catch(err=>{
	 	 res.json({
		  	status:'1',
		  	msg:'失败',
		  	count:0,
		  	assortment:'',
		  	result:err
		  });
	 })
})

module.exports = router;
