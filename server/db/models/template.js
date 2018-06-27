const Sequelize = require('sequelize')
const db = require('../db')

const Template = db.define('template', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  coverImgUrl: {
    type: Sequelize.TEXT
  },
  chapters: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Template
