const express=require('express');
const router=express.Router();
const axios=require('axios');

const API_KEY="api_key=44ee4947e13dc94c0b86e95eee37e7ea";
const BASE_URL="https://api.themoviedb.org/3";
const API_URL=BASE_URL+"/discover/movie?sort_by=popularity.desc&"+API_KEY;
const TV_API=BASE_URL+"/tv/on_the_air?"+API_KEY;
const IMAGE_URL="https://image.tmdb.org/t/p/w500"
const DATA="https://api.themoviedb.org/3/movie/"
const YOUTUBE_URL="https://www.youtube.com/embed/";
const VIDEO_URL="/videos";

router.get('/',(req,res)=>{
    getData();
    async function getData(){
        const result=await axios.get(API_URL);
        const tv_show=await axios.get(TV_API);
        console.log(tv_show.data)
        res.render('layouts/api',{data:result.data.results,image:IMAGE_URL,tv:tv_show.data.results,name:req.user});
    }
});

router.get('/:id/show',(req,res)=>{
    getData();
    async function getData(){
        try{
        const result=await axios.get(DATA+req.params.id+"?"+API_KEY);
        const video=await axios.get(`${DATA}${req.params.id}${VIDEO_URL}?${API_KEY}`)
        res.render("layouts/api_show",
        {   data:result.data,
            image:IMAGE_URL,
            name:req.user,
            no_reviews:0,
            youtube:YOUTUBE_URL,
            video_url:video.data
        }
        );
        }catch(e){
            console.log(e)
        }
        let no_review=0;
    }
})



module.exports=router;