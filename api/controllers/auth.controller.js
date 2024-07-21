const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js'); // Adjust the path according to your project structure
const responsMsg = require('./../utilities/responseMsgs.js')
const jwt = require('jsonwebtoken')

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

const signIn = async (req,res) => {
  const {userEmail, userPass} = req.body
  if (!userEmail || !userPass || userEmail === '' || userPass === '') {
    res.status(400).json({
      data : responsMsg.FAIL,
      message : "You Must Fill Out All Fields"
    })
  }

  try{
    const validUser = await User.findOne({userEmail})
    if (!validUser) {
      res.status(400).json({
        data : responsMsg.FAIL,
        message : "User Not Found"
      })
    }

    const validPassword = bcrypt.compareSync(userPass, validUser.userPass)
    if (!validPassword) {
      res.status(400).json({
        data : responsMsg.FAIL,
        message : "Valid Password"
      })
    }
    const token = jwt.sign(
      {id: validUser._id},
      process.env.JWT_SECRET
    )
    
    const {userPass: pass, ...rest} = validUser._doc

    res.status(200).cookie('access_token', token, {
      httpOnly : true,
    }).json({
      message: responsMsg.SUCCESS,
      data: rest
    })
  } catch(er) {
    console.log(er.message ? er.message : er)

  }

}

const google = async (req,res) => {
  try{
    const {name, email, photoGoogleUrl} = req.body
    const user = await User.findOne({email})

    if (user) {
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
      const {password, ...rest} = user._doc
      res.status(200).cookie('access_token', token, {
        httpOnly: true,
      }).json(rest)
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8)
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10)
      const newUser = new User({
        username: name.toLowerCase().split(' ').join('').Math.random().toString(9).slice(-4),
        userEmail: email,
        userPass: hashedPassword,
        profilePicture: photoGoogleUrl
      })
      await newUser.save()
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
      const {password, ...rest} = newUser._doc
      res.status(200).cookie('access_token', token, {
        httpOnly: true
      }).json(rest)
    }


  } catch(er){
      console.log(er.message ? er.message : er)
  }

}

module.exports = {
   signUp,
   signIn,
   google

 };
