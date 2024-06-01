import express from 'express';
import user_controller from '../controllers/user.js';
import path_controller from '../controllers/path.js';
import { renderForm, savePackage, getDeliveries } from '../controllers/package.js';
import { render2Form, savePendaftaran, getpendaftaran } from '../controllers/pendaftaran.js';
import { render3Form, savePendaftaran2, getpendaftaran2 } from '../controllers/pendaftaran2.js';

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

router.get('/', renderForm);
router.post('/save', savePackage);
router.get('/deliveries', getDeliveries);

router.get('/', render2Form);
router.post('/tambahkurir', savePendaftaran);
router.get('/list_akun', getpendaftaran);

router.get('/', render3Form);
router.post('/tambahagen', savePendaftaran2);
router.get('/list_akun2', getpendaftaran2);

export default router;