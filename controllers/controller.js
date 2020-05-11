const indexCrtl = {};
const jwt = require('jsonwebtoken');
var accessTokenSecret = 'dvgregafre55481635zefiohnaqdz2ef89rteqhdiuizebf6582f69efz';
var refreshTokenSecret = 'grgherg555e5ze45fer5e5azezfrtsr8r4et486rt7rth9zrozjkergo';
var refreshTokens = [];
var users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
];
var books = [
    {
        "author": "Chinua Achebe",
        "country": "Nigeria",
        "language": "English",
        "pages": 209,
        "title": "Things Fall Apart",
        "year": 1958
    },
    {
        "author": "Hans Christian Andersen",
        "country": "Denmark",
        "language": "Danish",
        "pages": 784,
        "title": "Fairy tales",
        "year": 1836
    },
    {
        "author": "Dante Alighieri",
        "country": "Italy",
        "language": "Italian",
        "pages": 928,
        "title": "The Divine Comedy",
        "year": 1315
    },
];




indexCrtl.login=(req,res)=>{


//un stocke le user dans une variable, ici il n'y a pas utilisation d'un bdd




   // read username and password from request body
   var { username, password } = req.body;

   // filter user from the users array by username and password
   var user = users.find(u => { return u.username === username && u.password === password });

   if (user) {
       // generate an access token
       var accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
       var refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

       refreshTokens.push(refreshToken);

       res.json({
           accessToken,
           refreshToken
       });
   } else {
       res.send('Username or password incorrect');
   }
}


indexCrtl.books=(req,res)=>{
   

    res.json(books);

}

indexCrtl.add=(req,res)=>{
  
    var { role } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }


    var book = req.body;
    books.push(book);

    res.send('Book added successfully');
}



indexCrtl.logout=(req,res)=>{

    var { token } = req.body;
    // refreshTokens = refreshTokens.filter(token => t !== token);
    refreshTokens = refreshTokens.filter(t=> t !== token);



    res.send("Logout successful");
}

module.exports = indexCrtl;
