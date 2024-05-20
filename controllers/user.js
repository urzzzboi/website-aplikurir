const login = (req, res, next) => {
  let msg = req.session.err || "";
  req.session.err = "";
  let user = req.session.user;
  req.session.user = null;
  res.render("login-page", { user: user || "", message: msg });
};

// The other functions remain the same
const logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};

const auth = async (req, res, next) => {
  console.log('Request Body:', req.body);
  const data = {
    email: req.body.email,
    password: req.body.password,
    status: req.body.status,
  };
  req.session.err = "";

  try {
    console.log('Mencari user dengan email:', data.email, 'dan status:', data.status);
    const user = await User.findOne({ where: { Email_User: data.email, Password_User: data.password, Status_User: data.status } });
    console.log('Hasil pencarian user:', user);

    if (!user || data.email !== user.Email_User) {
      req.session.err = "Username yang dimasukkan salah!";
      return res.redirect('/');
    }

    if (data.password !== user.Password_User) {
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
