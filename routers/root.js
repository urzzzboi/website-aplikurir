import express from 'express';
import user_controller from '../controllers/user.js';
import path_controller from '../controllers/path.js';
import { renderForm, savePackage, getDeliveries } from '../controllers/package.js';
import { render2Form, saveKurir } from '../controllers/regisKurir.js';
import { render3Form, saveUser, } from '../controllers/regisUser.js';
import { deleteUser, fetchUsers, renderInitialView } from '../controllers/regisList.js';
import { getAllPackages, getPackageById } from '../controllers/packageController.js';
import { getPenentuanKurirData } from '../controllers/kurir.js';

const router = express.Router();

// User routes
router.get('/', user_controller.login);
router.post("/login", user_controller.auth);
router.get('/logout', user_controller.logout);

// Path routes
router.get('/admin', path_controller.halamanAdmin);
router.get('/agen', renderForm);
router.get('/karyawan', getAllPackages);  // Menggunakan getAllPackages untuk route /karyawan
//router.get('/penentuan-kurir', path_controller.halamanPenentuan);
router.get('/pendaftaran', path_controller.halamanPendaftaran);
router.get('/riwayat', path_controller.halamanRiwayat);
router.get('/list-akun', path_controller.halamanAkun);
router.get('/list-pengantaran', path_controller.halamanPengantaran);
router.get('/penentuan-kurir', getDeliveries);
router.get('/pendaftaran-kurir', path_controller.pilihkurir);
router.get('/pendaftaran-agen-karyawan', path_controller.pilihagenkaryawan);
router.get('/coba', path_controller.test);

// Package routes
router.post('/save', savePackage);
router.get('/package/:id', getPackageById);  // Menggunakan getPackageById untuk route /package/:id

// Pendaftaran kurir routes
router.get('/kurir', render2Form);
router.post('/tambahkurir', saveKurir);

// Pendaftaran agen/karyawan routes
router.get('/agen-karyawan', render3Form);
router.post('/tambahagen', saveUser);

router.get('/', renderInitialView);
router.post('/fetch-users', fetchUsers);

// Rute untuk menghapus pengguna
router.post('/delete-user/:id', deleteUser); 

router.get('/list-paket', getPenentuanKurirData); 

export default router;
