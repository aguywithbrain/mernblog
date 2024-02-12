import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    return next(errorHandler(400, "All feilds are Required Please Fill Them "));
  }

  const hashedpassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    password: hashedpassword,
    email,
  });

  try {
    await newUser.save();
    console.log(newUser);
    res.json({
      message: "New User Is Created",
      success: "true",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") { // Cheacks all the feilds
    next(errorHandler(400, "All feilds are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not Found")); // Return here
    }

    const validPassword = await bcryptjs.compare(password, validUser.password); // Await here
    if (!validPassword) {
     return next(errorHandler(400, "Invalid Password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {password: pass, ...rest} = validUser._doc
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json("Signin Successfully");
      
  } catch (error) {
    next(error);
}

};
