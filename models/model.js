import {Sequelize, DataTypes} from 'sequelize';

const sequelize = new Sequelize("application_db", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

export {sequelize, DataTypes};