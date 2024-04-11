import mongoose from "mongoose"

const urlSchema = new mongoose.Schema(
	{
		shortID:{
			type : String,
			required :true,
			unique :true,
		},
		originalURL:{
			type : String,
			required: true,
		}
	},
	{ timestamps: true },
);

const URL = mongoose.model("URL",urlSchema);

export default URL;
