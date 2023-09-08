const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup controller (router handler)

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //check if user a;ready exist
    const existingUser = await User.findOne({ email }); //finding existing user by email

    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });

    //secure password

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10); //hashing password
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Password hashing failed" });
    }

    //create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "User Created Successfully",
        data: user,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "User Creation Failed" });
  }
};


//LOGIN CONTROLLER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email or Password Missing" });

    try {
        const findUser = await User.findOne({ email });

        if (!findUser)
            return res
            .status(401)
            .json({ success: false, message: "User not found" });

        const payload = {
            email : findUser.email,
            role: findUser.role,
            id : findUser._id
        }

        if( await bcrypt.compare(password, findUser.password)){
            
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            })
            // findUser = findUser.toObject();
            const user = findUser.toObject();
            user.token = token;
            user.password = undefined; //hiding password from findUser object not from DB;

            const options = {
              expires : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
              httpOnly: true
            }
            res.cookie("user-cookie",token, options).json({
              success : true,
              token,
              user,
              message : "User Logged In Successfully"
            })

        }else{ 
            return res
            .status(401)
            .json({ success: false, message: "Incorrect Password" });
        }
    } 
    catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "User Login Failed" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "User Login Failed" });
  }
};
