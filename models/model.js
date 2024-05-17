import {Sequelize, DataTypes} from 'sequelize';

const sequelize = new Sequelize("application_db", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
});

export {sequelize, DataTypes};