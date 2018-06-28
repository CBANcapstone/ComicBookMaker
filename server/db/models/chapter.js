const Sequelize = require('sequelize');
const db = require('../db');

const Chapter = db.define('chapter', {
  title: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Chapter;
