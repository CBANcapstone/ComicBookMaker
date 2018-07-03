const router = require('express').Router();
const { Story, Chapter, Template, User, UserRole } = require('../db/models');

module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    let story = await Template.createStory(req.body.templateId, req.user)
    res.json(story);
  } catch (err) {
    next(err);
  }
});

router.get('/open-stories', async (req, res, next) => {
  try {
    let allStories = await Story.findOpenStories()
    res.json(allStories)
  } catch (err) {
    next(err)
  }

});

router.get('/:id', async (req, res, next) => {
  try {
    let story = await Story.findOne({
      where: {
        id: req.params.id
      },
      include: [{ all: true }]
    });
    res.json(story);
  } catch (err) {
    next(err);
  }
});


router.get('/:id/chapters', (req, res, next) => {
  Chapter.findAll({
    where : {
      storyId: req.params.id
    }
  })
    .then(chapters => res.status(200).send(chapters))
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: [{ all: true }]
    });
    res.status(200).send(user.stories);
  } catch (err) {
    next(err);
  }
});

router.post('/chapter/:chid', async (req, res, next) => {
  try {
    let chapter = await Chapter.findById(req.params.chid);
    let updated = await chapter.update({
      imageUrl: req.body.url,
      completed: true
    });
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

router.get('/:id/:chapterid', async (req, res, next) => {
  try {
    let chapter = await Chapter.findById(req.params.chapterid);
    res.json(chapter);
  } catch (err) {
    next(err);
  }
});

router.get('/', (req, res) => {
  Story.findAll({ include: [{ all: true }] }).then(stories =>
    res.json(stories)
  );
});
