const { string } = require("joi")
const mongoose = require("mongoose")

const schema = mongoose.Schema({
 
	title: {
		type:String,
		required:[true,'Please add a title'],
	},
	content: {
		type:String,
		required:[true,'Please add a content'],
	},
	postedDate:String,
	imageUrl: {
		type: String,
	},
	comments:[{
		user_id:{
			type: mongoose.Schema.Types.ObjectId,
			required:true,
			ref:"User",
		},
		username:{
			type:String,
			required:true
		},
		comment:{
			type:String,
			required:[true,'Please add a comment'],
		},
		postedDate:{
			type:String,
			required:true
		}
	}
	],
	likes:[{
		user_id:{
			type: mongoose.Schema.Types.ObjectId,
			required:true,
			ref:"User",
		}
	}]
},{
	timeStamps:true
}
)

module.exports = mongoose.model("article", schema)