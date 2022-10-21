
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    date: { type: Date, required: true },
    data: { type: String, required: true },
    membershipstatus: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);
