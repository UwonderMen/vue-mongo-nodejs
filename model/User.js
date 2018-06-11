const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let fruitSchema = new Schema({
	userId:String,
	userMonicker:String,
	nickName:String,
	avatar:String,
	material:String,
	place:String,
	sex:String,
	fans:Number,
	follow:Number,
	myLove:Array,
	likeFruit:Array,
	constellatory:String,
	likeFruitType:Array,
	cart:[
		{
			name:String,
			id:String,
			price:Number,
			image:Array,
			checked:Number,
			goodsNumber:Number
		}
	],
	age:Number,
	receiveAddress:[
		{
			recipientName:String,
			recipientTel:String,
			recipientPostcodes:Number,
			recipientAddress:String,
			recipientDetailAddress:String,
			isDefaultAddress:Number,
			addressId:String
		}
	],
	username:String,
	orderList:[
		{
			orderId:String,
			address:Array,
			selectGoodsList:Array,
			createOrderDate:String,
			orderTotalMoney:Number,
			orderStatus:Number
		}
	],
	password:String,
	telPhone:String,
	postcodes:Number
}) 

let Users = mongoose.model('Users',fruitSchema);

module.exports = Users;