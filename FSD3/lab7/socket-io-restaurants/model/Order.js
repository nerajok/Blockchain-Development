
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	orderId:{
		type: String,
		require: true
	},
//	item: String,
	item:{
		type:String,
		require: true
	},
	customer_name:{
		type:String,
		require: true
	}

});
const Order = mongoose.model('Order', orderSchema, 'Orders');
module.exports = Order;
