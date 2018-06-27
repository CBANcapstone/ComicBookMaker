const Sequelize = require('sequelize')
const db = require('../db')

const Chapter = db.define('chapter', {
    title : {
        type : Sequelize.STRING
    },
    description : {
        type : Sequelize.STRING
    },
    imageUrl : {
        type : Sequelize.STRING
    },
    status : {
        type : Sequelize.ENUM('complete', 'incomplete')
    },
    creator : {
        type : Sequelize.STRING
    }
})

module.exports = Chapter