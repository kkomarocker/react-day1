const router = require("express").Router();
const User = require("../db/user");
const bcrypt = require("bcrypt");

router.get("/users", async (req, res, next) => {
	try {
		const data = await User.findAll();
		res.send(data);
	} catch (err) {
		next(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const { userName, password } = req.body;

		const user = await User.findOne({
			where: {
				userName,
			},
			attributes: ["userName", "password"],
		});

		if (user) {
			const passwordHash = user.get("password");
			const passwordMatch = await bcrypt.compare(password, passwordHash);

			if (passwordMatch) {
				res.send("Login Successful");
			} else {
				res.send("Invalid Password");
			}
		} else {
			res.send("Invalid user name");
		}
	} catch (err) {
		res.send(err);
	}
});

router.post("/register", async (req, res, next) => {
	try {
		const { userName, firstName, lastName, email, password } = req.body;
		const saltRound = 10;
		let hashedPassword = "";

		await bcrypt.hash(password, saltRound, (err, hash) => {
			if (err) console.log(err);
			hashedPassword = hash;

			User.findOrCreate({
				where: {
					userName,
				},
				defaults: {
					userName,
					firstName,
					lastName,
					email,
					password: hashedPassword,
				},
			}).then(([user, created]) => {
				const createdUser = user.get({ plain: true });
				const { userName, createdAt } = createdUser;

				const data = {
					userName,
					createdAt,
					created,
				};

				res.send(data);
			});
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
