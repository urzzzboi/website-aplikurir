import { sequelize } from "../models/model.js";
import { QueryTypes } from 'sequelize';

// Function untuk menghasilkan nomor resi unik dengan format "ak" + 10 angka
const generateNomorResi = async () => {
    const MAX_ATTEMPTS = 10;
    let attempts = 0;
    let isUnique = false;
    let nomorResi = '';

    while (!isUnique && attempts < MAX_ATTEMPTS) {
        attempts += 1;
        const randomNumbers = Math.floor(1000000000 + Math.random() * 9000000000);
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
    const user = req.session.user || { email: 'user@example.com' };
    res.render('page/halaman-agen', { user });
};

// Function untuk menyimpan data
export const savePackage = async (req, res) => {
    const {
        nama_pengirim, no_hp_pengirim, deskripsi, berat, panjang, lebar, jumlah_kiriman,
        nama_penerima, no_hp_penerima, alamat_tujuan, kecamatan, kelurahan, latitude, longitude
    } = req.body;

    const dimensi = panjang * lebar;  // Kalkulasi dimensi

    try {
        const nomorResi = await generateNomorResi();

        const query = `INSERT INTO penerimaan_paket 
            (nama_pengirim, no_hp_pengirim, deskripsi, berat, dimensi, jumlah_kiriman, nama_penerima, no_hp_penerima, alamat_tujuan, kecamatan, kelurahan, nomor_resi, latitude, longitude )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await sequelize.query(query, {
            replacements: [nama_pengirim, no_hp_pengirim, deskripsi, berat, dimensi, jumlah_kiriman, nama_penerima, no_hp_penerima, alamat_tujuan, kecamatan, kelurahan, nomorResi, latitude, longitude],
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
    try {
        const [deliveries] = await sequelize.query('SELECT * FROM penerimaan_paket');
        res.render('page/agen/list-paket', { deliveries, selectedDeliverie: null });
    } catch (error) {
        console.error('Error fetching deliveries:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const getDeliverieById = async (req, res) => {
    const deliverieId = req.params.id;
    try {
        const [deliveries] = await sequelize.query('SELECT * FROM penerimaan_paket');
        const [selectedDeliverieArray] = await sequelize.query(
            'SELECT * FROM penerimaan_paket WHERE ID_Data_Penerimaan_Paket = ?',
            { replacements: [deliverieId] }
        );
        const selectedDeliverie = selectedDeliverieArray[0];
        res.render('page/agen/list-paket', { deliveries, selectedDeliverie });
    } catch (error) {
        console.error('Error fetching deliverie:', error);
        res.status(500).send('Internal Server Error');
    }
}
