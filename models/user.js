import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  Email_User: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password_User: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Status_User: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.Password_User = await bcrypt.hash(user.Password_User, 10);
    },
  },
});

export default User;
