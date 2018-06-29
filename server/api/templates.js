const router = require('express').Router()
const {Template} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.json(await Template.findAll())
  } catch (err) {
    next(err)
  }
})
