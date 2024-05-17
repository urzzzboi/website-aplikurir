import User from "../models/user.js";

const login = (req, res, next) => {
  let msg = req.session.err || "";
  req.session.err = "";
  let user = req.session.user;
  req.session.user = null;
  res.render("login", { user: user || "", message: msg });
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};

const auth = (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  req.session.err = "";
  User.findOne({ where: { email: data.Email_User } })
    .then((results) => {
      if (!results) {
        req.session.err = "Incorrect email or password.";
        req.session.user = {
          email: data.Email_User,
        password: data.Password_User,
        };
        res.redirect("/login");
      } else if (data.Password_User != results.password) {
        req.session.err = "Incorrect password.";
        req.session.user = {
          email: data.Email_User,
        password: data.Password_User,
        };
        res.redirect("/login");
      } else {
        req.session.user = results;
        res.redirect("/");
      }
    })
    .catch((err) => {
      req.session.err = "err database";
      req.session.user = {
        email: data.Email_User,
        password: data.Password_User,
      };
      res.redirect("/login");
    });
};
export default { login, logout, auth };
