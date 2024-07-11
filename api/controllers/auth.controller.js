const User = require('./../models/user.model.js')
const ResponseMsgs = require('./../utilities/responseMsgs.js')
const bcrypt = require('bcryptjs')

const signUp = async (req, res) => {
   try{
        const {userName, userEmail, password} = req.body
        if (!userEmail || !userName || !password) {
            res.status(400).json({
                message: "All Fields Are Required"
            })
        }
        const hashedPass = bcrypt.hashSync(password, 10)
        const newUser = new User({
            userName,
            userEmail,
            password: hashedPass
        })

        await newUser.save()

    res.status(200).json({
        message : "Signup is successful"
    })
   } catch(er) {
        console.log(er)
        res.status(400).json({
            message : ResponseMsgs.FAIL,
            data : er.message ? er.message : er
        })
   }
}

module.exports = {
    signUp
}