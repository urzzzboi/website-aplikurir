import { sequelize } from "../models/model.js";

// Function untuk menampilkan form input
export const render2Form = (req, res) => {
    const user = req.session.user || { email: 'user@example.com' }; // Ganti sesuai dengan data user yang ada di session
    res.render('page/admin/pendaftaran-kurir', { user });
};

// Function untuk menyimpan data
export const savePendaftaran = async (req, res) => {
    const {
        nama, handphone, email, password, kecamatan, kelurahan
    } = req.body;

    const query = `INSERT INTO data_kurir 
        (nama, handphone, email, password, kecamatan, kelurahan)
        VALUES (?,?,?,?,?,?)`;

    try {
        await sequelize.query(query, {
            replacements: [nama, handphone, email, password, kecamatan, kelurahan],
            type: sequelize.QueryTypes.INSERT
        });
        res.redirect('pendaftaran-kurir');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Function untuk menampilkan daftar kurir
export const showListKurir = async (req, res) => {
    const query = 'SELECT * FROM data_kurir';
    try {
        const results = await sequelize.query(query, { type: QueryTypes.SELECT });
        res.render('page/admin/list-akun.ejs', { kurirs: results, user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Function untuk menghapus akun kurir
export const deleteKurir = async (req, res) => {
    const id_kurir = req.params.id_kurir;

    try {
        const query = `DELETE FROM data_kurir WHERE id_kurir =?`;
        await sequelize.query(query, {
            replacements: [id_kurir],
            type: sequelize.QueryTypes.DELETE
        });
        res.redirect('list-akun');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};