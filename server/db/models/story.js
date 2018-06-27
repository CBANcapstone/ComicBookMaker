const Sequelize = require('sequelize')
const db = require('../db')

const Story = db.define('story', {
    title : {
        type : Sequelize.STRING
    },
    description: {
        type : Sequelize.STRING
    },
    coverImgUrl: {
        type : Sequelize.STRING
    }
})

module.exports = Story
