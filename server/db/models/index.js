const User = require('./user')
const Story = require('./story')
const UserRole = require('./user_role')
const Chapter = require('./Chapter')

User.belongsToMany(Story, {through: UserRole})
Story.belongsToMany(User, {through: UserRole})

Story.hasMany(Chapter, {as: 'Chapters'})
Chapter.belongsTo(Story)

module.exports = {
  User,
  Story
}
