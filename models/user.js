import {sequelize, DataTypes} from "./model.js";

const User = sequelize.define('user', {
    Email_User : DataTypes.STRING,
    Password_User : DataTypes.STRING,
    Status_User : DataTypes.STRING,
});
export default User;
