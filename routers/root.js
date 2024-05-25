import express from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

router.get('/login', userController.login);
router.post('/login', userController.auth);
router.get('/logout', userController.logout);
router.post('/register', userController.register);

// Rute untuk menampilkan form register
router.get('/register', (req, res) => {
  res.render('register');
});

// Rute untuk menangani registrasi user baru
router.post('/register', userController.register);

// Rute terlindungi untuk halaman dashboard berdasarkan status
router.get('/admin/dashboard', (req, res) => {
    if (req.session.user && req.session.user.Status_User === 'admin') {
        res.render('page/halaman-admin'); // Mengarahkan ke halaman admin di folder view/page
    } else {
        res.redirect('/login');
    }
});

router.get('/agen/dashboard', (req, res) => {
    if (req.session.user && req.session.user.Status_User === 'agen') {
        res.render('page/halaman-agen'); // Mengarahkan ke halaman agen di folder view/page
    } else {
        res.redirect('/login');
    }
});

router.get('/pegawai/dashboard', (req, res) => {
    if (req.session.user && req.session.user.Status_User === 'pegawai') {
        res.render('page/halaman-karyawan'); // Mengarahkan ke halaman karyawan di folder view/page
    } else {
        res.redirect('/login');
    }
});

export default router;
