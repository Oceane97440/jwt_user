const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'dvgregafre55481635zefiohnaqdz2ef89rteqhdiuizebf6582f69efz';
const refreshTokenSecret = 'grgherg555e5ze45fer5e5azezfrtsr8r4et486rt7rth9zrozjkergo';
const refreshTokens = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var indexRouter = require('./router/router');
app.use('/', indexRouter);



app.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
});



























app.listen(3000, () => {
    console.log('Authentication service started on port 3000');
})

