import { generateToken } from "../lib/utils.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

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

    const user = await User.findOne({email});

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
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePicture,
      });
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
