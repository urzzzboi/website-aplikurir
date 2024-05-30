import express from 'express';
import user_controller from '../controllers/user.js';
import path_controller from '../controllers/path.js';

const router = express.Router();

router.get('/', user_controller.login);
router.get('/logout', user_controller.logout);
router.post("/login", user_controller.auth);

router.get("/admin", path_controller.halamanAdmin);
router.get("/agen", path_controller.halamanAgen);
router.get('/karyawan', path_controller.halamanKaryawan);
router.get('/penentuan-kurir', path_controller.halamanPenentuan);
router.get('/pendaftaran', path_controller.halamanPendaftaran);
router.get('/riwayat', path_controller.halamanRiwayat);
router.get('/list-akun', path_controller.halamanAkun);
router.get('/list-pengantaran', path_controller.halamanPengantaran);
router.get('/list-paket', path_controller.halamanPaket);
router.get('/pendaftaran-kurir', path_controller.pilihkurir);
router.get('/pendaftaran-agen-karyawan', path_controller.pilihagenkaryawan);


export default router;