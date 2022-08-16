const express = require('express');
const db= require('../config/database');
const bcrypt=require('bcrypt');
const passport=require('passport');
const router =express.Router();
const local =require('../config/passport-config');


// This is the login route and the full route is /user/login 
router.get('/login',(req,res)=>{
    res.render('../views/users/login',{name:req.user});
});

router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/user/login',
    failureFlash:true
}));

// This is for logging out the website 
router.get('/logout',(req,res)=>{
    // Just call the logout() function
    req.logout();
    res.redirect('/');

})

// /user/register

router.get('/register',(req,res)=>{
    res.render('../views/users/register',{name:req.user});
});

router.post('/register',async(req,res)=>{
    const{username,email,password}=req.body;
    try {
        //This is for hashing the password
        const hashedPassword=await bcrypt.hash(password,10);
        //This is for saving the hashed passowrd to the database
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