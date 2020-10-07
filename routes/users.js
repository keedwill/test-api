const router = require('express').Router()
const {
    registerUser,
    loginUser,
    userAuth,
    serializeUser,
    checkRole,
  } = require("../utils/auth");



//register user
router.post("/register-user", async (req, res) => {
    await registerUser(req.body, "user", res);
  });
  
//users login
router.post("/login-user", async (req, res) => {
    await loginUser(req.body, "user", res);
  });



module.exports = router;