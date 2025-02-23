const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password, role, specialization, experience, age, medicalHistory } = req.body;
  console.log(req.body)
  try {
    let existingUser = await (role === "Doctor" ? Doctor : Patient).findOne({ email });
    if (existingUser) return res.status(400).json({ message: `${role} already exists` });

    let userData = { name, email, password };
    
    if (role === "Doctor") {
      userData.specialization = specialization;
      userData.experience = experience;
    } else {
      userData.age = age;
      userData.medicalHistory = medicalHistory;
    }

    const user = await (role === "Doctor" ? Doctor : Patient).create(userData);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role,
      token: generateToken(user._id, role),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await (role === "Doctor" ? Doctor : Patient).findOne({ email });
    if (!user) return res.status(404).json({ message: `${role} not found` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role,
      token: generateToken(user._id, role),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
