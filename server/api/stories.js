const router = require('express').Router()
const {Story, Chapter, Template, User, UserRole} = require('../db/models')

module.exports = router

router.post('/createstory', async (req, res, next) => {
  //need to add try / catch
  let template = await Template.findById(req.body.templateId)
  let {title, description, coverImgUrl} = template
  let story = await Story.create({
    title,
    description,
    coverImgUrl
  })
  let userRole = await UserRole.create({
    role: 'creator',
    userId: req.user.id,
    storyId: story.id
  })
  let chapters = await Promise.all(
    template.chapters.map(chapter => {
      return Chapter.create({
        title: chapter,
        storyId: story.id
      })
    })
  )
  let storyToSend = story.get({plain: true})
  storyToSend.chapters = chapters
  res.json(storyToSend)
})

router.get('/', (req, res) => {
  Story.findAll().then(stories => res.json(stories))
})

router.get('/:userId', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.params.userId
      },

      include: [{all: true}]
    })
    res.status(200).send(user.stories)
  } catch (err) {
    next(err)
  }
})
