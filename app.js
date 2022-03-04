const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('./database');
const session = require('express-session');
var stringify = require('json-stringify');

const server = app.listen(port, () => {
    console.log("Server is start at " + port);
})

app.set('view engine', "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: 'bbq chips',
    resave: true,
    saveUninitialized: true
}))

//Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const PostRoute = require('./routes/postRoutes');
const ProfileRoute = require('./routes/profileRoutes');
const UploadRoute = require('./routes/uploadRoutes');
const SearchRoute = require('./routes/searchRoutes');
const MessagesRoute = require('./routes/messagesRoutes');
const logoutRoute = require('./routes/logout');


//Api routes
const postsApiRoute = require('./routes/api/posts');
const usersApiRoute = require('./routes/api/users');
const chatsApiRoute = require('./routes/api/chats');

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/logout', logoutRoute)
app.use('/posts', middleware.requireLogin, PostRoute);
app.use('/profile', middleware.requireLogin, ProfileRoute);
app.use('/uploads', middleware.requireLogin, UploadRoute);
app.use('/search', middleware.requireLogin, SearchRoute);
app.use('/messages', middleware.requireLogin, MessagesRoute);
app.use('/api/posts', postsApiRoute);
app.use('/api/users', usersApiRoute);
app.use('/api/chats', chatsApiRoute);


app.get('/', middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle: "Home",
        UserLoggedIn: req.session.user,
        UserLoggedInJs: JSON.stringify(req.session.user)
    }
    res.status(200).render('home', payload);
})