const mongoose = require("mongoose")

const schema = mongoose.Schema({
 
	name: {
		type:String,
		required:[true,'Please add a title'],
	},
	email: {
		type:String,
		required:[true,'Please add a content'],
	},
	message: {
		type:String,
		required:[true,'Please add a content'],
	},
},{
	timeStamps:true
}
)

module.exports = mongoose.model("message", schema)