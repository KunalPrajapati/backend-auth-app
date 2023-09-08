const express = require('express');
const router = express.Router();


const {login, signup} = require('../Controllers/Auth')
const {auth, IsStudent, IsAdmin} = require('../middlewares/auth');

router.post('/login', login);
router.post('/signup', signup);


router.get("/test", auth, (req, res) => {
    res.json({
        success : true,
        message : "welcome to testing route",

    })
})



//Protected Routes

router.get("/students", auth, IsStudent, (req, res) => {
    res.json({
        success : true,
        message : "welcome to protected students route",

    })
})


router.get("/admin", auth, IsAdmin, (req, res) => {
    res.json({
        success : true,
        message : "welcome to protected admin route",

    })
})


module.exports = router;