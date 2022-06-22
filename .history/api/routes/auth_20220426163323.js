const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// REGISTER USER
router.post('/register', async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.getSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
  
    // Save user and return respond
    const user = await newUser.save()
    res.status(200).json(user)  
  } catch (err) {
    res.status(500).json(err) 
  }
})

module.exports = router