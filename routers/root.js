import express from 'express';
import user_controller from '../controllers/user.js';

const router = express.Router();

router.get('/', user_controller.login);

router.get('/logout', user_controller.logout);


router.get("/admin", (req, res) => {
    res.render('page/halaman-admin', {user: req.session.user || "" });
});

router.post("/login", user_controller.auth);

router.get('/penentuan-kurir', (req, res) =>{
    res.render('page/penentuan-kurir');
});

router.get('/pendaftaran', (req, res) =>{
    res.render('page/pendaftaran');
});

router.get('/riwayat', (req, res) =>{
    res.render('page/riwayat');
});


export default router;