const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js'); // Adjust the path according to your project structure

const signUp = async (req, res) => {
  try {
    const { username, userEmail, userPass } = req.body;
    console.log('Received data:', req.body);

    if (!username || !userEmail || !userPass) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(userPass, 10);

    const newUser = new User({
      username,
      userEmail,
      userPass: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error); // Log the error to understand what went wrong
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signUp };
