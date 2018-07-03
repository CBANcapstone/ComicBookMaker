const router = require('express').Router();
const { Story, Chapter, Template, User, UserRole } = require('../db/models');

module.exports = router;

// route creating a story
router.post('/', async (req, res, next) => {
  try {
    let story = await Template.createStory(req.body.templateId, req.user);
    res.json(story);
  } catch (err) {
    next(err);
  }
});

// route to get all open stories 
router.get('/open-stories', async (req, res, next) => {
  try {
    let allStories = await Story.findOpenStories();
    res.json(allStories);
  } catch (err) {
    next(err);
  }
});

// route to get user stories
router.get('/user-stories', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.user.id
      },
      include: [{ all: true }]
    });
    res.status(200).send(user.stories);
  } catch (err) {
    next(err);
  }
});

// route which creates a chapter when user submit his comic
router.post('/chapter/:chid', async (req, res, next) => {
  try {
    Chapter.createChapter(req.params.chid, req.user, req.body.url);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

// get single story for single view
// need to make the right order of the chapters
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

// not sure what these routes do

router.get('/:id/chapters', async (req, res, next) => {
  let chapters = await Chapter.findAll({ where: { storyId: req.params.id } });
  res.status(200).send(chapters);
});

router.get('/:id/:chapterid', async (req, res, next) => {
  try {
    let chapter = await Chapter.findById(req.params.chapterid);
    res.json(chapter);
  } catch (err) {
    next(err);
  }
});
