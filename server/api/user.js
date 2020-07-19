const router = require('express').Router();
const {green, red} = require('chalk');
const {User,Pool} = require('../db/models')
module.exports=router;

router.get('/',async (req,res,next)=>{
    console.log("cookie",typeof req.signedCookies.id);
    res.send();
})



//for not signed cookies
function getcookie(req) {
    const cookie = req.headers.cookie;
    return cookie.split('; ');
  }