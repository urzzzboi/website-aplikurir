import { sequelize } from "../models/model.js";

// Function untuk menampilkan form input
export const render3Form = (req, res) => {
    const user = req.session.user || { email: 'user@example.com' }; // Ganti sesuai dengan data user yang ada di session
    res.render('page/admin/pendaftaran-agen-karyawan', { user });
};

// Function untuk menyimpan data
export const savePendaftaran2 = async (req, res) => {
    const {
        email, password, status
    } = req.body;

    const query = `INSERT INTO data_users 
        (email, password, status)
        VALUES (?, ?, ?)`;

    try {
        await sequelize.query(query, {
            replacements: [email, password, status],
            type: sequelize.QueryTypes.INSERT
        });
        res.redirect('pendaftaran-agen-karyawan');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Function untuk menampilkan daftar pengiriman
export const getpendaftaran2 = async (req, res) => {
    const user = req.session.user || { email: 'user@example.com' }; // Ganti sesuai dengan data user yang ada di session
    const query = 'SELECT * FROM data_users';

    try {
        const results = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.render('page/admin/list-akun', { deliveries: results, user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
