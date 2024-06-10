import express from 'express';
import user_controller from '../controllers/user.js';
import path_controller from '../controllers/path.js';
import { renderForm, savePackage, getDeliveries } from '../controllers/package.js';
import { render2Form, saveKurir, } from '../controllers/regisKurir.js';
import { render3Form, saveUser, } from '../controllers/regisUser.js';
import { fetchUsers, renderInitialView } from '../controllers/regisList.js';

const router = express.Router();

// User routes
router.get('/', user_controller.login);
router.post("/login", user_controller.auth);
router.get('/logout', user_controller.logout);

// Path routes
router.get('/admin', path_controller.halamanAdmin);
router.get('/agen', renderForm); // Perbarui rute ini agar menggunakan renderForm dari package.js
router.get('/karyawan', path_controller.halamanKaryawan);
router.get('/penentuan-kurir', path_controller.halamanPenentuan);
router.get('/pendaftaran', path_controller.halamanPendaftaran);
router.get('/riwayat', path_controller.halamanRiwayat);
router.get('/list-akun', path_controller.halamanAkun);
router.get('/list-pengantaran', path_controller.halamanPengantaran);
router.get('/list-paket', getDeliveries); // Perbarui rute ini agar menggunakan getDeliveries dari package.js
router.get('/pendaftaran-kurir', path_controller.pilihkurir);
router.get('/pendaftaran-agen-karyawan', path_controller.pilihagenkaryawan);
router.get('/coba', path_controller.test);

// Package routes
router.post('/save', savePackage);

// Pendaftaran kurir routes
router.get('/kurir', render2Form); // Perbarui rute agar tidak bentrok
router.post('/tambahkurir', saveKurir);
// router.get('/list_akun', getpendaftaran);
// router.get('/list-akun', showListKurir);

// Pendaftaran agen/karyawan routes
router.get('/agen-karyawan', render3Form); // Perbarui rute agar tidak bentrok
router.post('/tambahagen', saveUser);

// Rute untuk menampilkan tampilan awal
router.get('/users', renderInitialView);

// Rute untuk menampilkan daftar agen dan karyawan gudang
router.post('/fetch-users', fetchUsers);

export default router;
