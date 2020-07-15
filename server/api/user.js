const router = require('express').Router();
const {green, red} = require('chalk');
const {User,Pool} = require('../db/models')
module.exports=router;

router.get('/',async (req,res,next)=>{
    // console.log(req.cookies['id']);
    console.log(req.JSONcookies);
    
    res.send(req.cookies.id);
})