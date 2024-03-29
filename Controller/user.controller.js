const User = require("../user/User.model");
const bcrypt = require("bcryptjs");
//Signup
const signupUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
      name: name,
      password: hashedPassword,
      email: email,
    });
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
//login
const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Username not found by this email" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser?.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    return res.status(200).json({ message: "Login sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  signupUser,
  login,
};
