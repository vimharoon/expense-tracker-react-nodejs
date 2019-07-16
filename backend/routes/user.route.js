const router = require('express').Router()
const User = require('./../models/user.model')

router.get('/', (req, res) => {
  User.find().then(users => {
    res.status(200).json(users)
  }).catch(error => {
    res.status(400).json('Error', error)
  })
})

router.post('/add', (req, res) => {
  const username = req.body.username

  const newUser = new User({ username })

  newUser.save().then(() => {
    res.status(201).json('User added!')
  }).catch(error => {
    res.status(400).json('Error', error)
  })
})

module.exports = router
