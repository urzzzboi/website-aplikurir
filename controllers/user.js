import User from "../models/user.js";

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
      if (!results || results.password !== data.password) {
        req.session.user = {
          email: data.email,
        };
        req.session.err = "Email atau Password yang dimasukkan salah!";
        res.redirect("/");
      } else {
        req.session.user = results;

        switch (results.status) {
          case 'admin':
            res.redirect("/admin");
            break;
          case 'agen':
            res.redirect("/agen");
            break;
          case 'karyawan':
            res.redirect("/karyawan");
            break;
          default:
            res.redirect("/");
        }
      }
    })
    .catch((err) => {
      req.session.err = "Error database";
      req.session.user = {
        email: data.email,
        password: data.password,
      };
      res.redirect("/");
    });
};

export default { login, logout, auth};
