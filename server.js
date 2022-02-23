const express=require('express');
const app = express();
const db= require('./config/database');
const userRouter=require('./routes/user');
const apiRouter=require('./routes/api');
const passport=require('passport');
const session=require('express-session');
const flash=require('express-flash');
const axios=require('axios').default;

// set our view engine
app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'));
app.use(express.static('views'));
app.use(flash());
app.use(session({
    secret:"secret",resave:false
}))
app.use(passport.initialize());
app.use(passport.session());
    

// user Router
app.use('/user',userRouter);

// api Router

app.use('/',apiRouter);

// app.get('/',(req,res)=>{
//     getData();
//    async function getData(){
//         const data=await db.promise().query("select * from movies");
//         if(data)
//         {
//             console.log(data[0]);
//             res.render('layouts/test',{data:data[0],name:req.user});
//             res.status(200);
//         }else{
//             console.log(error);
//         }
       
//    }
// })

// app.get('/:id/show',(req,res)=>{
//     console.log(req.params.id);
//     const movie_id=req.params.id;
//     let query="select * from  movies inner join reviews where movie_id=id or id=?"
//         db.query(query,[movie_id,movie_id],(err,result)=>{
//            if (err) console.log(`Errror is ${err}`);
//            if(result.length!=0)
//                 res.render('layouts/show',{data:result[0],review:result,name:req.user})
//             else
//             query="select * from movies where id=?"
//               db.query(query,[movie_id],(err,result2)=>{
//                   if(err) throw err;
//                 res.render('layouts/show',{data:result2[0],name:req.user,no_reviews:0})
//               })
//         })

// })

app.get('/:id/test',(req,res)=>{
    const query="select * from reviews where movie_id=?"
    db.query(query,[req.params.id],(err,result)=>{
        if (err)  throw err ;
        res.send(result[0]);
    })

})

app.get('/:id/review/new',(req,res)=>{
    const query="select title from movies where id =?"
    db.query(query,[req.params.id],(err,result)=>{
     if(err) throw err;
    if(req.user)
    res.render('reviews/new',{movie_id:req.params.id,movie:result,name:req.user});
    else
        res.redirect('/user/login');
    })
})

app.post('/:id/review/new',(req,res)=>{
    const{rating,review}=req.body;
   const query="insert into reviews(movie_id,review,rating,user_id)values(?,?,?,?)";
   db.query(query,[req.params.id,review,rating,req.user.id],(err,result)=>{
       if (err) throw err;
       res.redirect('/');
   })
});

app.get('/create',(req,res)=>{
    res.render('layouts/new');
});
app.post('/create',(req,res)=>{
    const{title,genre,desc,movie,director,year}=req.body;
    const query="insert into movies(title,genre,director,release_year,description,movie_img)values(?,?,?,?,?,?)";
    db.query(query,[title,genre,director,year,desc,movie],(err,result)=>{
        if(err) throw err
        res.render('/test');
        console.log(result.affectedRows);
    });
}); 

app.post('/:id/post',(req,res)=>{
    const{acting,music,cinematography,storyline,film,confirmation}=req.body;
    // const average=(parseInt(acting) +parseInt(music) + parseInt(cinema) + parseInt(storyline) + parseInt(film))/5;
    // const query="insert into "
    // db.query()
    if(req.user)
    {
    const result=(parseInt(acting)+parseInt(music)+parseInt(cinematography)+parseInt(film)+parseInt(storyline))/5;
    const queryArr=
        [
        confirmation,
        result,
        req.user.id,
        acting,
        music,
        cinematography,
        storyline,
        film,
        req.params.id
    ]
    const query="insert into reviews(review,totalRating,user_id,acting,music,cinematography,storyline,filmography,movie_id)values(?,?,?,?,?,?,?,?,?)"
    db.query(query,queryArr,(err,result)=>{
        if(err) throw err;
        res.render(`/${req.params.id}/show`);
        console.log(result.affectedRows());
    })
    res.redirect(`/${req.params.id}/show`);
    }
    else{
        res.redirect('/user/login');
    }
})
const portNumber=5000;
app.listen(portNumber,()=>{console.log(`Listening on port ${portNumber}`)});

