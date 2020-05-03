const router = require("express").Router();
const User = require("../db/user");


router.get("/register", (req, res, next) => {
	try {
		res.send("register user");
	} catch (err) {
		next(err);
	}
});

module.exports = router;