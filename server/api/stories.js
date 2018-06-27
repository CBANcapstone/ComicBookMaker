const router = require('express').Router()
const {Story, Chapter, Template} = require('../db/models')

module.exports = router


router.post('/createstory', (req,res,next)=>{
  console.log(req.body)
})



router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
