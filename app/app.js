const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("TEST");
    console.log('test log')
});

app.listen(3000);