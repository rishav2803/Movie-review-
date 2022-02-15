const express = require('express');
const db= require('../config/database');

const bcrypt=require('bcrypt');
const passport=require('passport');
const router =express.Router();
const local =require('../config/passport-config');


router.get('/login',(req,res)=>{
    res.render('../views/users/login',{name:req.user});
});

router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/user/login',
    failureFlash:true
}));

router.get('/register',(req,res)=>{
    res.render('../views/users/register',{name:req.user});
});

router.post('/register',async(req,res)=>{
    const{username,email,password}=req.body;
    try {
        const hashedPassword=await bcrypt.hash(password,10);
        const query='insert into users(username,email,password)values(?,?,?)';
        db.query(query,[username,email,hashedPassword],(err,result)=>{
            if(err) throw err 
            console.log(result.affectedRows);
            res.redirect('/user/login');
        })
    } catch{
        res.redirect('/users/register');
    }
});



module.exports=router;