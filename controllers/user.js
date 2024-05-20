import bcrypt from 'bcrypt';
import User from './models/User.js';

const login = (req, res, next) => {
  const msg = req.session.err || "";
  req.session.err = "";
  const user = req.session.user;
  req.session.user = null;
  res.render("halaman-admin", { user: user || "", message: msg });
};

const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const auth = async (req, res, next) => {
  console.log('Request Body:', req.body);
  const { email, password, status } = req.body;
  req.session.err = "";

  try {
    console.log('Mencari user dengan email:', email, 'dan status:', status);
    const user = await User.findOne({ where: { Email_User: email, Status_User: status } });
    console.log('Hasil pencarian user:', user);

    if (!user) {
      req.session.err = "Username yang dimasukkan salah!";
      return res.redirect('/');
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password_User);
    if (!isPasswordValid) {
      req.session.err = "Password yang dimasukkan salah!";
      return res.redirect('/');
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
    req.session.err = "Database Bermasalah";
    return res.redirect('/');
  }
};

export default { login, logout, auth };
