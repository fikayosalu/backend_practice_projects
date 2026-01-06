import mongoose from "mongoose";

const stringSchema = new mongoose.Schema({
	id: String,
	value: String,
	properties: Object,
	character_frequency_map: Object,
	created_at: Date,
});

const Strings = mongoose.model("Strings", stringSchema);

export default Strings;
