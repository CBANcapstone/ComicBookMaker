const Sequelize = require('sequelize');
const db = require('../db');

const UserRole = db.define('user_role', {
  role: {
    type: Sequelize.ENUM('creator', 'contributor')
  }
});

module.exports = UserRole;
