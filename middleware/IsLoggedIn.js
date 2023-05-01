const db = require("../config/database");

function isLoggedIn(req, res, next) {
    // Checking if req.user is truthy
    if (req.user) {
        return next();
    }
    res.redirect('/user/login');
}

module.exports = isLoggedIn;
