import { sequelize } from "../models/model.js";

// Function untuk menampilkan form input
export const render2Form = (req, res) => {
    const user = req.session.user || { email: 'user@example.com' };
    res.render('page/admin/pendaftaran-kurir', { user });
};

// Function untuk menyimpan data kurir
export const saveKurir = async (req, res) => {
    const { nama, handphone, email, password, kecamatan, kelurahan } = req.body;

    const query = `INSERT INTO data_kurir 
        (nama, handphone, email, password, kecamatan, kelurahan)
        VALUES (?,?,?,?,?,?)`;

    try {
        await sequelize.query(query, {
            replacements: [nama, handphone, email, password, kecamatan, kelurahan],
            type: sequelize.QueryTypes.INSERT
        });
        res.render('page/admin/pendaftaran-kurir', { user: req.session.user, success: 'Akun berhasil ditambahkan' });
    } catch (error) {
        console.error(error);
        let errorMessage = 'Server error';
        if (error.name === 'SequelizeUniqueConstraintError') {
            errorMessage = 'Nama kurir yang dimasukkan sudah terdaftar';
        }
        res.render('page/admin/pendaftaran-kurir', { user: req.session.user, error: errorMessage });
    }
};
