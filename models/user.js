
import { sequelize, DataTypes} from "./model.js";

const User = sequelize.define('data_users', {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  status: DataTypes.STRING,
});
export default User;