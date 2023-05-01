const express = require("express");
const app = express();
const db = require("./config/database");
const userRouter = require("./routes/user");
const apiRouter = require("./routes/api");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const isLoggedIn = require("./middleware/IsLoggedIn");
const processData = require("./utils/process");

// set our view engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(express.static("views"));
app.use(flash());
app.use(
  session({
    secret: "secret",
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// user Router
app.use("/user", userRouter);

// api Router

app.use("/", apiRouter);

app.get("/:id/review/new", (req, res) => {
  console.log("here bitch");
  const query = "select title from movies where id =?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) throw err;
    if (req.user)
      res.render("reviews/new", {
        movie_id: req.params.id,
        movie: result,
        name: req.user,
      });
    else res.redirect("/user/login");
  });
});

app.post("/:id/review/new", (req, res) => {
  const { rating, review } = req.body;
  const query =
    "insert into reviews(movie_id,review,rating,user_id)values(?,?,?,?)";
  db.query(
    query,
    [req.params.id, review, rating, req.user.id],
    (err, result) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

// app.get("/create", (req, res) => {
//   res.render("layouts/new");
// });

// app.post("/create", (req, res) => {
//   const { title, genre, desc, movie, director, year } = req.body;
//   const query =
//     "insert into movies(title,genre,director,release_year,description,movie_img)values(?,?,?,?,?,?)";
//   db.query(
//     query,
//     [title, genre, director, year, desc, movie],
//     (err, result) => {
//       if (err) throw err;
//       res.render("/test");
//       console.log(result.affectedRows);
//     }
//   );
// });

app.post("/:id/post", isLoggedIn, async (req, res) => {
  const { acting, cinematography, confirmation, film, music, storyline } =
    req.body;
  const result =
    (parseInt(acting) +
      parseInt(music) +
      parseInt(cinematography) +
      parseInt(film) +
      parseInt(storyline)) /
    5;
  const { data } = await processData(confirmation);
  const sentiment = data.choices[0].text.split("\n\n")[1];
  console.log(sentiment);

  const queryArr = [
    confirmation,
    result,
    req.user.id,
    acting,
    music,
    cinematography,
    storyline,
    film,
    req.params.id,
    sentiment,
  ];
  const query =
    "insert into reviews(review,totalRating,user_id,acting,music,cinematography,storyline,filmography,movie_id,sentiment)values(?,?,?,?,?,?,?,?,?,?)";
  db.query(query, queryArr, (err, _) => {
    if (err) throw err;
    res.redirect(`/${req.params.id}/movie/show`);
  });
});

const portNumber = 5000;
app.listen(portNumber, () => {
  console.log(`Listening on port ${portNumber}`);
});
