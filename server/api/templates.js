const router = require('express').Router()
const {Template} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log('HIT THE ROUTE JACK!')
  try {
    res.json(await Template.findAll())
  } catch (err) {
    next(err)
  }
})
