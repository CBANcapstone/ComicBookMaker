const User = require('./user')
const Story = require('./story')
const UserRole = require('./user_role')
const Chapter = require('./Chapter')
const Resource = require('./Resource')

User.belongsToMany(Story, {through: UserRole})
Story.belongsToMany(User, {through: UserRole})

Story.hasMany(Chapter, {as: 'chapters'})
Chapter.belongsTo(Story)
Chapter.belongsTo(User, {as: 'creator'})

module.exports = {
  User,
  Story,
  Resource
}
