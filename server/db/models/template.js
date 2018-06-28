const Sequelize = require('sequelize');
const db = require('../db');

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

module.exports = Template;
