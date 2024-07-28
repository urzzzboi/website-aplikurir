import { sequelize } from "../models/model.js";
import { Sequelize } from "sequelize";

// Function untuk menampilkan form input
export const render3Form = (req, res) => {
    const user = req.session.user || { email: 'user@example.com' };
    res.render('page/admin/pendaftaran-agen-karyawan', { user, success: null, error: null });
};

// Function untuk menyimpan data
export const saveUser = async (req, res) => {
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
        res.render('page/admin/pendaftaran-agen-karyawan', { success: 'Akun berhasil ditambahkan', error: null, user: req.session.user });
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            res.render('page/admin/pendaftaran-agen-karyawan', { error: 'Email yang dimasukkan sudah terdaftar', success: null, user: req.session.user });
        } else {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
};
