const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  engagementScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'events',
  timestamps: false,
});

// Define association
Event.associate = (models) => {
  Event.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'organizer', // Use a meaningful alias
  });
};

module.exports = Event;