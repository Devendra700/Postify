const mongoose = require('mongoose');

//password is Mongodb@2001 and we have to write Mongodb%402001

/*new Schema = mongoose.Schema;*/

// const UserSchema = new Schema({
const chatSchema = new mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);