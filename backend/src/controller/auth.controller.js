import { sendWelcomeEmail } from "../email/emailHandle.js";
import cloudinary from "../lib/cloudinay.js";
import { generateToken } from "../lib/utils.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "all the fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password length should be greater than 6 digit" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "enter the valid email" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({ message: "email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashpassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(newUser._id, res);
      res.status(201).json({
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePicture,
      });

      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullname,
          process.env.CLIENT_URL,
        );
      } catch (error) {
        console.error("failed to send email in from controller", error);
      }
    } else {
      res.status(401).json({ message: "invalid user" });
    }
  } catch (error) {
    console.log("error had occurin signup controller", error);
    res
      .status(500)
      .json({ message: "internal error had occured in signup contoller" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "enter all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "invalid credintials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "invalid credentials" });

    generateToken(user._id, res);

    res.status(201).json({
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePicture,
    });
  } catch (error) {
    console.log("error had occurin login controller", error);
    res
      .status(500)
      .json({ message: "internal error had occured in login contoller" });
  }
};

export const logout = async (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "logged out successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ message: "not the loggedin user" });
    }
  
    const { profilePicture } = req.body;
    if (!profilePicture) {
      return res.status(401).json({ message: "profile pic is needed" });
    }
  
    const newprofielPic = await cloudinary.uploader.upload(profilePicture);
  
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: newprofielPic.secure_url },
      { new: true },
    );
  
    res.status(200).json(updatedUser, { message: "profile photo is updated" });
  } catch (error) {
    console.log("error in updated controller",error)
    return res.status(500).json({message:"internal server error in updated controller"})
  }
};
