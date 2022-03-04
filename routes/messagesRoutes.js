const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../schemas/UserSchema');
const Chat = require('../schemas/ChatSchema');

router.get('/', (req, res, next) => {
    var payload = {
        pageTitle: "Inbox",
        UserLoggedIn: req.session.user,
        UserLoggedInJs: JSON.stringify(req.session.user)
    };
    res.status(200).render('inboxPage', payload);
})


router.get('/new', (req, res, next) => {
    var payload = {
        pageTitle: "New Messages",
        UserLoggedIn: req.session.user,
        UserLoggedInJs: JSON.stringify(req.session.user)
    };
    res.status(200).render('newMessage', payload);
})

router.get('/:chatId', async (req, res, next) => {

    var userId = req.session.user._id;
    var chatId = req.params.chatId;
    var isValid = mongoose.isValidObjectId(chatId);
    var payload = {
        pageTitle: "Chat",
        UserLoggedIn: req.session.user,
        UserLoggedInJs: JSON.stringify(req.session.user)
    };

    if (!isValid) {
        payload.errorMessage = "Chat doesn't exist or you don't have access to view it"
        return res.status(200).render('chatPage', payload);
    }

    var chat = await Chat.findOne({ _id: chatId, users: { $elemMatch: { $eq: userId } } })
        .populate("users")

    if (chat == null) {
        var userFound = await User.findById(chatId);
        if (userFound != null) {
            //get chat using user id
            chat = await getChatByUserId(userFound._id, userId)
        }
    }

    if (chat == null) {
        payload.errorMessage = "Chat doesn't exist or you don't have access to view it"
    }
    else {
        payload.chat = chat
    }
    res.status(200).render('chatPage', payload);
})

function getChatByUserId(userLoggedInId, otherUserId) {
    return Chat.findOneAndUpdate({
        isGroupChat: false,
        users: {
            $size: 2,
            $all: [
                { $elemMatch: { $eq: mongoose.Types.ObjectId(userLoggedInId) } },
                { $elemMatch: { $eq: mongoose.Types.ObjectId(otherUserId) } },
            ]
        }
    },
        {
            $setOnInsert: {
                users: [userLoggedInId, otherUserId]
            }
        },
        {
            new: true,
            upsert: true
        })
        .populate("users")
}

module.exports = router;