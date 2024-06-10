import { sequelize } from "../models/model.js";

// Function untuk menampilkan tampilan awal
export const renderInitialView = (req, res) => {
    res.render('page/admin/list-akun', { users: [], fields: [] }); // Menampilkan tampilan awal dengan array kosong
};

// Function untuk menampilkan daftar agen dan karyawan gudang
export const fetchUsers = async (req, res) => {
    try {
        const userType = req.body.userType;

        if (!userType || !['kurir', 'agen', 'karyawan'].includes(userType)) {
            return res.render('page/admin/list-akun.ejs', { users: [], fields: [] });
        }

        let query = '';
        let fields = [];

        if (userType === 'kurir') {
            query = 'SELECT * FROM data_kurir';
            fields = ['nama', 'handphone', 'email', 'password', 'kecamatan', 'kelurahan'];
        } else {
            query = 'SELECT id, email, password, status FROM data_users WHERE status = ?';
            fields = ['email', 'password', 'status'];
        }

        const [results] = await sequelize.query(query, {
            replacements: [userType === 'kurir' ? null : userType],
            type: sequelize.QueryTypes.SELECT
        });

        console.log(results); // Log hasil kueri

        res.render('page/admin/list-akun.ejs', { users: results, fields: fields });
    } catch (error) {
        console.error(error); // Log pesan kesalahan
        res.status(500).send('Failed to fetch users');
    }
};