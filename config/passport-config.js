const localStrategy=require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport=require('passport')
const db= require('./database');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    try {
    const result = await db.promise().query('select * from users where id=?',[id]);
    if(result[0][0])
    {
        done(null,result[0][0])
    }   
} catch (error) {
        done(error,null);
    }
})

passport.use(new localStrategy({usernameField:"email"},
    async(email,password,done)=>{
        try {
        const data =await db.promise().query('select * from users where email=?',[email])
        console.log(data[0][0].email)
    if(data[0].length===0){
            done(null,false);
        }else if(await bcrypt.compare(password,data[0][0].password)){
            console.log(data[0][0].username);
            done(null,data[0][0]);
        }else{
            done(null,false);
        }   
        } catch (error) {
            done(error,false);
        }
    }
));





