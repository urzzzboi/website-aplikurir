import {sequelize, DataTypes} from "../models/model.js";

const User = sequelize.define('data_user', {
    Email_User : DataTypes.STRING,
    Password_User : DataTypes.STRING,
    Status_User : DataTypes.STRING,
});
export default User;
