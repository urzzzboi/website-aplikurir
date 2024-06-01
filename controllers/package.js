import { sequelize } from "../models/model.js";

// Function untuk menampilkan form input
export const renderForm = (req, res) => {
    const user = req.session.user || { email: 'user@example.com' }; // Ganti sesuai dengan data user yang ada di session
    res.render('page/halaman-agen', { user });
};

// Function untuk menyimpan data
export const savePackage = async (req, res) => {
    const {
        nama_pengirim, no_hp_pengirim, deskripsi, berat, dimensi,
        jumlah_kiriman, nama_penerima, no_hp_penerima, alamat_tujuan
    } = req.body;

    const query = `INSERT INTO penerimaan_paket 
        (nama_pengirim, no_hp_pengirim, deskripsi, berat, dimensi, jumlah_kiriman, nama_penerima, no_hp_penerima, alamat_tujuan)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        await sequelize.query(query, {
            replacements: [nama_pengirim, no_hp_pengirim, deskripsi, berat, dimensi, jumlah_kiriman, nama_penerima, no_hp_penerima, alamat_tujuan],
            type: sequelize.QueryTypes.INSERT
        });
        res.redirect('/agen');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Function untuk menampilkan daftar pengiriman
export const getDeliveries = async (req, res) => {
    const user = req.session.user || { email: 'user@example.com' }; // Ganti sesuai dengan data user yang ada di session
    const query = 'SELECT * FROM penerimaan_paket';

    try {
        const results = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.render('page/agen/list-paket', { deliveries: results, user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
