import { sequelize } from "../models/model.js";
import { QueryTypes } from 'sequelize';

// Function untuk menghasilkan nomor resi unik dengan format "ak" + 10 angka
const generateNomorResi = async () => {
    const MAX_ATTEMPTS = 10; // Batasan jumlah percobaan
    let attempts = 0;
    let isUnique = false;
    let nomorResi = '';

    while (!isUnique && attempts < MAX_ATTEMPTS) {
        attempts += 1;
        // Generate 10 random digits
        const randomNumbers = Math.floor(1000000000 + Math.random() * 9000000000); // 10 digit angka
        nomorResi = `AK${randomNumbers}`;

        const [results] = await sequelize.query(`SELECT COUNT(*) AS count FROM penerimaan_paket WHERE nomor_resi = ?`, {
            replacements: [nomorResi],
            type: QueryTypes.SELECT
        });

        console.log('Query Results:', results);

        if (results && results.count === 0) {
            isUnique = true;
        }
    }

    if (!isUnique) {
        throw new Error('Unable to generate a unique nomor resi after maximum attempts');
    }

    return nomorResi;
};

// Function untuk menampilkan form input
export const renderForm = (req, res) => {
    const user = req.session.user || { email: 'user@example.com' }; // Ganti sesuai dengan data user yang ada di session
    res.render('page/halaman-agen', { user });
};

// Function untuk menyimpan data
export const savePackage = async (req, res) => {
    const {
        nama_pengirim, no_hp_pengirim, deskripsi, berat, dimensi,
        jumlah_kiriman, nama_penerima, no_hp_penerima, alamat_tujuan, kecamatan, kelurahan
    } = req.body;

    try {
        const nomorResi = await generateNomorResi();

        const query = `INSERT INTO penerimaan_paket 
            (nama_pengirim, no_hp_pengirim, deskripsi, berat, dimensi, jumlah_kiriman, nama_penerima, no_hp_penerima, alamat_tujuan, kecamatan, kelurahan, nomor_resi)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await sequelize.query(query, {
            replacements: [nama_pengirim, no_hp_pengirim, deskripsi, berat, dimensi, jumlah_kiriman, nama_penerima, no_hp_penerima, alamat_tujuan, kecamatan, kelurahan, nomorResi],
            type: QueryTypes.INSERT
        });
        res.render('page/halaman-agen', { user: req.session.user || "", nomorResi });
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
        const results = await sequelize.query(query, { type: QueryTypes.SELECT });
        res.render('page/agen/list-paket', { deliveries: results, user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

export const getFormPage = async (req, res) => {
    try {
        const kecamatanQuery = 'SELECT * FROM kecamatan';
        const kecamatan = await sequelize.query(kecamatanQuery, { type: QueryTypes.SELECT });

        const kelurahanQuery = 'SELECT * FROM kelurahan';
        const kelurahan = await sequelize.query(kelurahanQuery, { type: QueryTypes.SELECT });

        res.render('page/halaman-agen', { kecamatan, kelurahan, user: req.session.user || "" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

