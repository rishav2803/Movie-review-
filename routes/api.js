const express = require("express");
const router = express.Router();
// axios is used to making get request inside the app.get()
const axios = require("axios");
const db = require("../config/database");

// Following is the things required  for using the API
const API_KEY = "api_key=44ee4947e13dc94c0b86e95eee37e7ea";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const TV_API = BASE_URL + "/tv/on_the_air?" + API_KEY;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const DATA = "https://api.themoviedb.org/3/movie/";
const YOUTUBE_URL = "https://www.youtube.com/embed/";
const VIDEO_URL = "/videos";

router.get("/", (req, res) => {
  try {
    getData();
    async function getData() {
      const result = await axios.get(API_URL);
      const tv_show = await axios.get(TV_API);
      console.log(tv_show.data.results[0]);
      res.render("layouts/api", {
        data: result.data.results,
        image: IMAGE_URL,
        tv: tv_show.data.results,
        name: req.user,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id/test", async (req, res) => {
  try {
    const query = "SELECT count(*) , r.*, u.username, u.email, u.id FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.movie_id = ? and "
    db.query(query, [req.params.id], (err, queryRes) => {
      if (err) throw err;
      res.send(queryRes);
    });

  } catch (err) {

  }
});

router.get("/:id/movie/show", (req, res) => {
  getData();
  async function getData() {
    try {
      const result = await axios.get(DATA + req.params.id + "?" + API_KEY);
      const video = await axios.get(
        `${DATA}${req.params.id}${VIDEO_URL}?${API_KEY}`
      );

      // const query =
      //   "select * from reviews,users where reviews.user_id=users.id and reviews.movie_id=?";
      const query = "SELECT r.*, u.username, u.email, u.id FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.movie_id = ? "
      db.query(query, [req.params.id], (err, queryRes) => {
        if (err) throw err;
        res.render("layouts/api_show", {
          data: result.data,
          image: IMAGE_URL,
          name: req.user,
          no_reviews: 0,
          youtube: YOUTUBE_URL,
          video_url: video,
          user_id: req.user,
          review: queryRes,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
});

router.get("/:id/series/show", (req, res) => {
  try {
    getData();
    async function getData() {
      const tv_show = await axios.get(TV_API);
      for (const details of tv_show.data.results) {
        if (details.id == req.params.id) {
          const query =
            "select * from reviews,users where reviews.user_id=users.id and reviews.movie_id=?";
          db.query(query, [req.params.id], (err, queryRes) => {
            if (err) throw err;
            res.render("layouts/api_series_show", {
              data: details,
              image: IMAGE_URL,
              name: req.user,
              youtube: YOUTUBE_URL,
              user_id: req.user,
              review: queryRes[0],
            });
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

