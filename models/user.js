import { sequelize, DataTypes } from '../models/model.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('data_user', {
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
});

// Hash password before saving it to the database
User.beforeCreate(async (user) => {
  user.Password_User = await bcrypt.hash(user.Password_User, 10);
});

export default User;
