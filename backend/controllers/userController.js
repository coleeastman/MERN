const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'}) // token expires 3 days
}

// login user
const loginUser = async (req, res) => {

    const {email, password} = req.body

    try {

        const user = await User.login(email, password) // check is user exists already

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }  

}

// signup user
const signupUser = async (req, res) => {

    const {email, password} = req.body 

    try {

        const user = await User.signup(email, password) // check if user exists already

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }  

}

// Send verification email
const sendVerificationEmail = async (req, res) => {
    const { email, password } = req.body;

    try {
        await User.sendemail(email, password);
        res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser, sendVerificationEmail }










