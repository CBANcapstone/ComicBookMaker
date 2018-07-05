const User = require('./user');
const Story = require('./story');
const Chapter = require('./chapter');
const Resource = require('./resource');
const Template = require('./template');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

User.belongsToMany(Story, { through: 'UserStory' });
Story.belongsToMany(User, { through: 'UserStory', as: 'contributors' });

Story.belongsTo(User, { as: 'creator' });

Story.hasMany(Chapter, { as: 'chapters' });
Chapter.belongsTo(Story);
Chapter.belongsTo(User, { as: 'creator' });

Story.findOpenStories = async function() {
  let allStories = await Story.findAll({
    where: {
      completed: false
    },
    include: [
      {
        model: Chapter,
        as: 'chapters'
      },
      {
        model: User,
        as: 'creator'
      },
      'contributors'
    ]
  });
  return allStories;
};

Template.createStory = async function(templateId, user) {
  let template = await Template.findById(templateId);
  let { title, description, coverImgUrl } = template;
  let story = await Story.create({
    title,
    description,
    coverImgUrl,
    creatorId: user.id
  });
  let chapters = await Promise.all(
    template.chapters.map(chapter => {
      return Chapter.create({
        title: chapter,
        storyId: story.id
      });
    })
  );
  let storyToSend = story.get({ plain: true });
  storyToSend.chapters = chapters;
  return storyToSend;
};

Chapter.createChapter = async function(chapterId, user, imageUrl) {
  try {
    let chapter = await Chapter.findById(chapterId);
    await chapter.update({
      imageUrl,
      creatorId: user.id,
      completed: true
    });
    let story = await Story.findById(chapter.storyId);
    if (story.creatorId !== user.id) {
      await story.addContributors([user.id]);
    }
  } catch (err) {
    console.error(err);
  }
};

Story.findByUser = async function(user, category) {
  const creator = () => {
    return Story.findAll({
      where: {
        creatorId: user.id // replace with user.id
      }
    });
  };
  const contributor = () => {
    return Story.findAll({
      include: [
        {
          model: User,
          as: 'contributors',
          where: {
            id: user.id
          }
        }
      ]
    });
  };
  switch (category) {
    case 'creator':
      return await creator();
    case 'contributor':
      return await contributor();
    default:
      let cr = await creator();
      let con = await contributor();
      return [...cr, ...con];
  }
};

module.exports = {
  User,
  Story,
  Resource,
  Template,
  Chapter
};
