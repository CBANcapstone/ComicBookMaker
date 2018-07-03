const Sequelize = require('sequelize');
const db = require('../db');

const Story = db.define('story', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  coverImgUrl: {
    type: Sequelize.TEXT
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Story.findOpenStories = async function() {
  let allStories = await Story.findAll({
    where : {
      completed : false
    },
    include : [{all : true}]
  })
  return allStories
}

module.exports = Story;
