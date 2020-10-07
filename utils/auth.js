const User = require("../models/User");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/index");

const registerUser = async (userDets, role, res) => {
    try {
      // validate the name
    
      let nameTaken = await validateName(userDets.name);
      if (nameTaken) {
        return res.status(400).json({
          message: `Username is alraedy taken`,
        });
      }
      // validate the email
      let emailTaken = await validateEmail(userDets.email);
      if (emailTaken) {
        return res.status(400).json({
          message: `Email is alraedy registered`,
        });
      }
  
      //hash the password
      const hashedP = await brcypt.hash(userDets.password, 12);
  
      // create new user
      const newUser = new User({
        ...userDets,
        password: hashedP,
        role: role,
      });
  
      await newUser.save();
      return res.status(201).json({ message: `User is created`, success: true });
    } catch (error) {
        console.log(error)
      return res
        .status(500)
        .json({ message: `Unable to create your account`, success: false ,error:error});
    }
  };

  const loginUser = async (userDets, role, res) => {
    let { name, password } = userDets;
    const user = await User.findOne({ name: name });
    if (!user) {
      return res.status(404).json({
        message: `name does not exist. Invalid login details`,
        success: false,
      });
    }
    // check if the role matches
    if (user.role !== role) {
      return res.status(403).json({
        message: `Please make sure you are logging in from the right portal`,
        success: false,
      });
    }
  
    // compare the password
    let isMatch = await brcypt.compare(password, user.password);
    if (isMatch) {
      //assign a token to a user
      let token = jwt.sign(
        {
          user_id: user._id,
          role: user.role,
          name: user.name,
          email: user.email,
        },
        SECRET,
        { expiresIn: "7 days" }
      );
  
      let result = {
        name: user.name,
        role: user.role,
        email: user.email,
        token: "Bearer " + token,
        expiresIn: 168,
      };
      return res.status(200).json({
        ...result,
        message: `you are now logged in`,
        success: true,
      });
    } else {
      return res.status(403).json({
        message: `Incorrect Password`,
        success: false,
      });
    }
  };
  

  const validateName = async (username) => {
    let user = await User.findOne({ username: username });
    return user ? true : false;
  };
  
  const validateEmail = async (email) => {
    let user = await User.findOne({ email: email });
    return user ? true : false;
  };

  module.exports = {
    registerUser: registerUser,
    loginUser: loginUser,
  };