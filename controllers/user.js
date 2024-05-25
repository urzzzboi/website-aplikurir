import bcrypt from 'bcrypt';
import User from '../models/user.js';

// const updatePasswords = async () => {
//   try {
//     const users = await User.findAll();
//     for (const user of users) {
//       if (!user.Password_User.startsWith('$2b$')) {  // bcrypt hashed passwords start with $2b$
//         const hashedPassword = await bcrypt.hash(user.Password_User, 10);
//         user.Password_User = hashedPassword;
//         await user.save();
//       }
//     }
//     console.log('Passwords updated successfully');
//   } catch (err) {
//     console.error('Error updating passwords:', err);
//   }
// };


//updatePasswords();

// const createNewUser = async (email, password, status) => {
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       Email_User: email,
//       Password_User: hashedPassword,
//       Status_User: status,
//     });
//     console.log('User created:', user);
//   } catch (err) {
//     console.error('Error creating user:', err);
//   }
// };

// createNewUser('test@example.com', 'password123', 'admin');


const login = (req, res, next) => {
  const msg = req.session.err || "";
  req.session.err = "";
  const user = req.session.user;
  req.session.user = null;
  res.render("login", { user: user || "", message: msg });
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
      return res.redirect('/login');
    }

    console.log('Password yang diinputkan:', password);
    console.log('Password yang di-hash dari database:', user.Password_User);

    const isPasswordValid = await bcrypt.compare(password, user.Password_User);
    console.log('Apakah password valid?', isPasswordValid);

    if (!isPasswordValid) {
      req.session.err = "Password yang dimasukkan salah!";
      return res.redirect('/login');
    }

    req.session.user = user;
    let redirectUrl = '/';

    switch (user.Status_User) {
      case 'admin':
        redirectUrl = '/admin/dashboard';
        break;
      case 'agen':
        redirectUrl = '/agen/dashboard';
        break;
      case 'pegawai':
        redirectUrl = '/pegawai/dashboard';
        break;
      default:
        redirectUrl = '/login';
    }

    return res.redirect(redirectUrl);

  } catch (err) {
    console.error('Database error:', err);
    req.session.err = "Database Bermasalah";
    return res.redirect('/login');
  }
};

const register = async (req, res) => {
  const { email, password, status } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      Email_User: email,
      Password_User: hashedPassword,
      Status_User: status,
    });
    res.status(201).json({ message: 'User berhasil dibuat', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Gagal membuat user' });
  }
};

export default { login, logout, auth, register };