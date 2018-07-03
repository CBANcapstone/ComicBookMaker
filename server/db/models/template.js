const Sequelize = require('sequelize');
const db = require('../db');
const Story = require('./story')
const Chapter = require('./chapter')
const UserRole = require('./user_role')

const Template = db.define('template', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  coverImgUrl: {
    type: Sequelize.TEXT
  },
  chapters: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
});


Template.createStory = async function(templateId, user){
  let template = await Template.findById(templateId)
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
    userId: user.id,
    storyId: story.id
  });
  let storyToSend = story.get({ plain: true });
  storyToSend.chapters = chapters;
  return storyToSend
}

module.exports = Template;
