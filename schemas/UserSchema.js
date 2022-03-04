const mongoose = require('mongoose');

//password is Mongodb@2001 and we have to write Mongodb%402001

/*new Schema = mongoose.Schema;*/

// const UserSchema = new Schema({
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "/images/profilePic.jpeg" },
    coverPhoto: { type: String },
    likes: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

var User = mongoose.model('User', UserSchema)
module.exports = User;