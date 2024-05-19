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

const auth = async (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    status: req.body.status,
  };
  req.session.err = "";

  try {
    console.log('Mencari user dengan email:', data.email, 'dan status:', data.status);
    const user = await User.findOne({ where: { Email_User: data.email, Status_User: data.status } });
    console.log('Hasil pencarian user:', user);

    if (!user) {
      return res.json({ success: false, message: "Username yang dimasukkan salah!" });
    }

    if (data.password !== user.Password_User) {
      return res.json({ success: false, message: "Password yang dimasukkan salah!" });
    }

    req.session.user = user;
    let redirectUrl = '/';

    switch (user.Status_User) {
      case 'admin':
        redirectUrl = '/views/page/halaman-admin.ejs';
        break;
      case 'agen':
        redirectUrl = '/views/page/halaman-agen.ejs';
        break;
      case 'pegawai':
        redirectUrl = '/views/page/halaman-karyawan.ejs';
        break;
      default:
        redirectUrl = '/';
    }

    return res.json({ success: true, redirectUrl: redirectUrl });

  } catch (err) {
    console.error('Database error:', err);
    return res.json({ success: false, message: "Database Bermasalah" });
  }
};

export default { login, logout, auth };
