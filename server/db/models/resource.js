const Sequelize = require('sequelize');
const db = require('../db');

const Resource = db.define('resource', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  imgUrl: {
    type: Sequelize.TEXT
  },
  category: {
    type: Sequelize.STRING
  }
});

module.exports = Resource;
