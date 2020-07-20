const router = require('express').Router();
const {green, red} = require('chalk');
const {User,Pool} = require('../db/models')
module.exports=router;

router.get('/',async (req,res,next)=>{
     console.log("cookie",req.signedCookies.id,' ',typeof req.signedCookies.id);
    const cookieId=req.signedCookies.id;
    try{
        const data=await User.findOne({where:{cookie_id:cookieId}});
        res.json(data);
    }catch(err){
        console.log(red("Can't fetch User",next(err)));
    }
    
})

router.post('/',async (req,res,next)=>{
    // const cookieId={cookie_id:req.signedCookies.id};
    try{
        await User.create(req.body);
        res.status(200);
    }catch(err){
        console.log(red("Can't create User",next(err)));
    }
})

//for not signed cookies
function getcookie(req) {
    const cookie = req.headers.cookie;
    return cookie.split('; ');
  }