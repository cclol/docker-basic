const express = require('express');
const app = express();

const usersRoute = require('./routes/users');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.urlencoded());
app.use(express.json());
app.use('/users', usersRoute);

app.get('/', (req, res) => {
    res.render('index');
});
app.listen(3000);