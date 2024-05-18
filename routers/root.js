import express from 'express';
import user_controller from '../controllers/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', { user: req.session.user || "", message: req.session.err || "" });
});

router.get('/', (req, res) => {
    res.render('halaman-admin', {user: req.session.user || ""});
});

router.get("/login", user_controller.login);
router.get("/logout", user_controller.logout);
router.post("/login", user_controller.auth);

export default router;