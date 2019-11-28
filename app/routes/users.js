const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');
const crypt = require('bcrypt');
const session = require('express-session');
const KnexSessionStore = require("connect-session-knex")(session);
const knex = require('./../dbconfig');


const store = new KnexSessionStore({
    knex: knex,
    tablename: "sessions" // optional. Defaults to 'sessions'
}); // defaults to a sqlite3 database

let uname = '';

router.use(
    session({
        secret: "test",
        name: "testcookie",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 120000 },
        store: store
    })
);
router.use(express.urlencoded());
router.use(express.json());

router.get('/', (req, res) => {
    res.render('users')
});

router.get('/home', (req, res) => {
    if(req.session.loggedIn === true) {
        res.render('home', {username: uname});
    } else {
        uname = '';
        res.redirect('/')
    }
});

router.get('/logout', (req, res) => {
    req.session.loggedIn = false;
    res.redirect('/');
})

router.post('/login', async (req, res) => {
    try {
        let table = 'users';
        let userInput = req.body.username;
        const result = await readUserPassword(table, userInput)
        const Userpw = result.find(item => item.password)

        if(Userpw === undefined) {
            res.redirect('/')
            console.log('undefined if')
            return
        }
        const comparePassword = await crypt.compare(req.body.password, Userpw.password);
        console.log(comparePassword)

        if (comparePassword === true) {
            uname = req.body.username
            req.session.loggedIn = true;
            //console.log(req.session)
            res.redirect('/users/home')
        } else {
            uname = '';
            res.redirect('/')
        }
    } catch (e) {
        console.log(e.message)
    }
});

router.post('/reg', async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.redirect('/users');
        return;
    }
    try {
        const hashedPassword = await crypt.hash(req.body.password, 10);
        let table = 'users';
        let data = [
            {
                id: uuid(),
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            }];
        insertData(table, data);
        console.log(data);
        res.redirect('/')
    } catch(e) {
        console.log(e.message)
    }
});

const readUserPassword = async (tableName, data) => {
    try {
        return await knex(tableName).where('username', data)
            .select('password')
    } catch(e) {
        console.log(e.message)
    }
};

const insertData = async (tableName, data) => {
    try {
        return await knex(tableName).insert(data);
    } catch (err) {
        console.log(err.message)
    }
};
module.exports = router;