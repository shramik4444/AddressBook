const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('your_database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // Change to 'postgres' if using PostgreSQL
});

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Address = sequelize.define('Address', {
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// Establish relationships
User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Address };
