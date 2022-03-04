const mongoose = require('mongoose');

//password for the database is Mongodb@2001 and we have to write Mongodb%402001
const PostSchema = new mongoose.Schema({
    content: { type: String, trim: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pinned: Boolean,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    retweetUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    retweetData: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true });

var Post = mongoose.model('Post', PostSchema)
module.exports = Post;