const router = require("express").Router();
const auth = require('../middleware/auth');


let indexCrtl = require("../controllers/controller");


/**
 * @request post
 * @controller login
 * '
 * 
 */
router.post('/login', indexCrtl.login);

router.get('/books',auth, indexCrtl.books)

router.post('/books/add',auth, indexCrtl.add)


//router.post('/token', indexCrtl.token)
router.post('/logout', indexCrtl.logout)


module.exports = router;
