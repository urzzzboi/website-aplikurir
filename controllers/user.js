import User from "../models/user.js";
import { sequelize, DataTypes } from "./models/model.js";

const login = (req, res, next) => {
  let msg = req.session.err || "";
  req.session.err = "";
  let user = req.session.user;
  req.session.user = null;
  res.render('login', { user: user || "", message: msg });

  
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};

const auth = (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    status: req.body.status,
  };
  req.session.err = "";
  User.findOne({ where: { email: data.email } })
    .then((results) => {
      if (!results) {
        req.session.err = "Email atau Passwordn yang dimasukkan salah!";
        req.session.user = {
          email: data.email,
          password: data.password,
        };
        res.redirect("/");
      } else {
        req.session.user = results;
        res.redirect("/admin");
      }
    })
    .catch((err) => {
      req.session.err = "err database";
      req.session.user = {
        email: data.email,
        password: data.password,
      };
      res.redirect("/");
    });
};

const getData = async (req, res) => {
  try {
      const results = await sequelize.query('SELECT * FROM data_users', { type: sequelize.QueryTypes.SELECT });
      res.send(results);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
}


export default { login, logout, auth, getData };
