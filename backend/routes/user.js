const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//SignIn APIs
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Received body:", req.body); // 🐛 Debug log

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    } else if (username.length < 4) {
      return res.status(400).json({ message: "Username should have at least 4 characters" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPass,
    });

    await newUser.save();

    return res.status(200).json({ message: "Signup successful" });

  } catch (error) {
    console.error("Signup error:", error); // 🔥 Log the actual error
    res.status(500).json({ message: "Internal server error" });
  }
});


//Login
router.post("/log-in", async(req, res) =>{
  const {username, password}= req.body;
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  bcrypt.compare(password, existingUser.password, (err, data) =>{
    if(data){
      const authClaims = [{name : username}, {jti:jwt.sign({}, "tcmTM")}];
      const token=jwt.sign({ authClaims }, "tcmTM", { expiresIn: "2d"});
      res.status(200).json({id: existingUser._id, token: token});
    }else{
      return res.status(400).json({ message: "Invalid credentials" });
    }
  })
})
module.exports = router;
