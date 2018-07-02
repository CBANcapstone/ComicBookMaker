const router = require('express').Router();
const { Story, Chapter, Template, User, UserRole } = require('../db/models');

module.exports = router;

router.post('/createstory', async (req, res, next) => {
  try {
    let template = await Template.findById(req.body.templateId);
    let { title, description, coverImgUrl } = template;
    let story = await Story.create({
      title,
      description,
      coverImgUrl
    });
    let chapters = await Promise.all(
      template.chapters.map(chapter => {
        return Chapter.create({
          title: chapter,
          storyId: story.id
        });
      })
    );
    await UserRole.create({
      role: 'creator',
      userId: req.user.id,
      storyId: story.id
    });
    let storyToSend = story.get({ plain: true });
    story.chapters = chapters;
    res.json(storyToSend);
  } catch (err) {
    next(err);
  }
});

router.get('/user', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.user.id
      },
      include: [{ 
        model : Story
      }]
    });
    res.status(200).send(user.stories);
  } catch (err) {
    next(err);
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

router.post('/chapter/:chid', async (req, res, next) => {
  try {
    let chapter = await Chapter.findById(req.params.chid);
    let updated = await chapter.update({
      imageUrl: req.body.url,
      completed: true
    });
    console.log(updated.get({ plain: true }));
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
  Story.findAll().then(stories => res.json(stories));
});
