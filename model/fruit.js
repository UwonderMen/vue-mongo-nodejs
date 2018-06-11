const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let fruitSchema = new Schema({
	id:String,
	name:String,
	image:Array,
	detail:Array,
	price:Number,
	originPlace:String,
	flavourType:String,
	isImport:Number,
	SalesNum:Number,
	praise:Number,
	checked:Number,
	goodsNumber:Number
}) 

let goodsList = mongoose.model('goodsList',fruitSchema);

module.exports=goodsList;