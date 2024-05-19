import express from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

router.get('/login', userController.login);
router.post('/login', userController.auth);
router.get('/logout', userController.logout);

router.get('/views/page/halaman-admin.ejs', (req, res) => {
  if (req.session.user && req.session.user.Status_User === 'admin') {
    res.render('page/halaman-admin');
  } else {
    res.redirect('/login');
  }
});

router.get('/views/page/halaman-agen.ejs', (req, res) => {
  if (req.session.user && req.session.user.Status_User === 'agen') {
    res.render('page/halaman-agen');
  } else {
    res.redirect('/login');
  }
});

router.get('/views/page/halaman-karyawan.ejs', (req, res) => {
  if (req.session.user && req.session.user.Status_User === 'pegawai') {
    res.render('page/halaman-karyawan');
  } else {
    res.redirect('/login');
  }
});

export default router;
