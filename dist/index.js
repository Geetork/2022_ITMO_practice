"use strict";
// setting up modules
const express = require('express');
// creating app
const app = express();
// setting up port (app.set(name, value) assigns any name to value)
app.set('port', process.env.PORT || 3000);
// setting up routes
app.get('/', (req, res) => {
    res.send('hello');
});
app.listen(app.get('port'), () => console.log(`Running on port ${app.get('port')}`));
