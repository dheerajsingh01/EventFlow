const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const models = {
  User: require('./user')(sequelize, DataTypes),
  Event: require('./event')(sequelize, DataTypes),
  // Include other models like Registration, Feedback, etc.
};

// Initialize associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = { sequelize, ...models };