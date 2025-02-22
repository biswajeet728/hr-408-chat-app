import { ErrorHandler } from "../lib/error.js";
import { generateToken } from "../lib/jwt.js";
import { TryCatch } from "../middlewares/error.middleware.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const create = TryCatch(async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  console.log(name, email, phone, password);

  if (!name || !email || !phone || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  if (password.length < 6) {
    return next(
      new ErrorHandler("Password must be at least 6 characters", 400)
    );
  }

  const user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  console.log("Creating user");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    phone: String(phone),
    password: hashedPassword,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
  });

  if (newUser) {
    // generate jwt token here
    generateToken(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      phone: newUser.phone,
      email: newUser.email,
      image: newUser.image,
    });
  } else {
    return next(new ErrorHandler("Invalid user data", 400));
  }
});

export const login = TryCatch(async (req, res, next) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  // Check if input is an email or a phone number
  const isEmail = /\S+@\S+\.\S+/.test(emailOrPhone); // Basic email regex
  const query = isEmail ? { email: emailOrPhone } : { phone: emailOrPhone };

  const user = await User.findOne(query);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  // generate jwt token here
  generateToken(user._id, res);

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    image: user.image,
  });
});

export const logout = TryCatch(async (req, res, next) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logged out successfully" });
});

export const me = TryCatch(async (req, res, next) => {
  res.status(200).json(req.user);
});
