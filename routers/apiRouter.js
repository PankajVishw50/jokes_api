
const router = require("express").Router();
const authController = require("../controllers/authController");
const jokeController = require("../controllers/jokeController");
const userController = require("../controllers/userController");
const auth = require("../middlewares/authenticationMiddleware");

router.post("/me", authController.createMe);
router.get("/me", [auth.guard], userController.getMe);
router.post("/login", authController.login);
router.post("/refresh-token", authController.getRefresh);
router.get("/jokes", [auth.guard], jokeController.getAllJokes);
router.get("/jokes/random", [auth.guard], jokeController.getJokeRandom);
router.post("/joke", [auth.guard], jokeController.createJoke);

module.exports = router;