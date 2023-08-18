
const router = require("express").Router();
const pageController = require("../controllers/pageController");
const auth = require("../middlewares/authenticationMiddleware");
    
router.get("/", pageController.getIndexPage);
router.get("/login", pageController.getLoginPage);
router.get("/signup", pageController.getSignUpPage);
router.get("/logout", [auth.guard], pageController.getLogout);
router.get("/post-joke", pageController.createPost);
router.get("/my-jokes", pageController.getJokes);

module.exports = router;