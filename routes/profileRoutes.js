const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');

router.get('/', (req, res, next) => {
    var payload = {
        pageTitle: req.session.user.username,
        UserLoggedIn: req.session.user,
        UserLoggedInJs: JSON.stringify(req.session.user),
        profileUser: req.session.user
    }
    res.status(200).render('profilePage', payload);
})
router.get('/:username', async (req, res, next) => {
    var payload = await getPayload(req.params.username, req.session.user)
    res.status(200).render('profilePage', payload);
})

router.get('/:username/replies', async (req, res, next) => {
    var payload = await getPayload(req.params.username, req.session.user)
    payload.selectedTab = "replies";
    res.status(200).render('profilePage', payload);
})

router.get('/:username/following', async (req, res, next) => {
    var payload = await getPayload(req.params.username, req.session.user)
    payload.selectedTab = "following";
    res.status(200).render('followersAndFollowing', payload);
})

router.get('/:username/followers', async (req, res, next) => {
    var payload = await getPayload(req.params.username, req.session.user)
    payload.selectedTab = "followers";
    res.status(200).render('followersAndFollowing', payload);
})

async function getPayload(username, userLoggedIn) {
    var user = await User.findOne({ username: username })
    if (user == null) {
        var user = await User.findById(username)
        if (user == null) {
            return {
                pageTitle: "User not found",
                UserLoggedIn: userLoggedIn,
                UserLoggedInJs: JSON.stringify(userLoggedIn)
            }
        }
    }
    return {
        pageTitle: user.username,
        UserLoggedIn: userLoggedIn,
        UserLoggedInJs: JSON.stringify(userLoggedIn),
        profileUser: user
    }

}
module.exports = router;