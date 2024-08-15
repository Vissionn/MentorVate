const mongoose = require("mongoose");

// Define the Category schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});

// Export the Category model
module.exports = mongoose.model("Category", categorySchema);
