import {sequelize, DataTypes} from "./model.js";

const User = sequelize.define('data_user', {
    Email_User : DataTypes.STRING,
    Password_User : DataTypes.STRING,
    Status_User : DataTypes.STRING,
    valueStatus : DataTypes.TINYINT,
});
export default User;
