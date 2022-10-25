
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    date: { type: Date, required: true },
    data: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual for user's full name
MessageSchema.virtual("formatted_date").get(function () {
    return this.date.toJSON().slice(0, 10).replace(/-/g, '/')
});
// Export model
module.exports = mongoose.model("Message", MessageSchema);
