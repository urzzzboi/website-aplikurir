import { sequelize } from "../models/model.js";

// Function untuk menampilkan tampilan awal
export const renderInitialView = (req, res) => {
    res.render('page/admin/list-akun', { users: [], fields: [] }); // Menampilkan tampilan awal dengan array kosong
};

// Function untuk mengambil data pengguna dari database
export const fetchUsers = (req, res) => {
    const userType = req.body.userType;

    // Validasi input userType
    if (!userType) {
        return res.status(400).send('User type is required');
    }

    let query = '';
    let fields = [];

    // Menentukan query SQL dan kolom berdasarkan tipe pengguna
    if (userType === 'kurir') {
        query = 'SELECT * FROM data_kurir';
        fields = ['nama', 'handphone', 'email', 'password', 'kecamatan', 'kelurahan'];
    } else if (userType === 'agen' || userType === 'karyawan') {
        query = 'SELECT id, email, password, status FROM data_users WHERE status = ?';
        fields = ['email', 'password', 'status'];
    } else {
        return res.render('page/admin/list-akun', { users: [], fields: [], userType: null });
    }

    // Menjalankan query ke database
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT, replacements: [userType === 'kurir' ? null : userType] })
        .then(results => {
            res.render('page/admin/list-akun', { users: results, fields: fields, userType: userType });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            res.status(500).send('Failed to fetch users');
        });
};

// Function untuk menghapus pengguna dari database
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const userType = req.body.userType;

    // Logging untuk memastikan bahwa parameter diterima dengan benar
    console.log(`Attempting to delete user with ID: ${userId} and type: ${userType}`);

    // Validasi input userId dan userType
    if (!userId || !userType) {
        console.error('User ID and user type are required');
        return res.status(400).send('User ID and user type are required');
    }

    let transaction;

    try {
        // Memulai transaksi
        transaction = await sequelize.transaction();

        if (userType === 'kurir') {
            // Hapus entri terkait di riwayat terlebih dahulu
            await sequelize.query(
                'DELETE FROM riwayat WHERE id_kurir = ?',
                { type: sequelize.QueryTypes.DELETE, replacements: [userId], transaction }
            );

            // Hapus entri terkait di pengantaran_paket
            await sequelize.query(
                'DELETE FROM pengantaran_paket WHERE id_data_kurir = ?',
                { type: sequelize.QueryTypes.DELETE, replacements: [userId], transaction }
            );

            // Hapus dari data_kurir
            await sequelize.query(
                'DELETE FROM data_kurir WHERE id_kurir = ?',
                { type: sequelize.QueryTypes.DELETE, replacements: [userId], transaction }
            );
        } else if (userType === 'agen' || userType === 'karyawan') {
            // Hapus dari data_users
            await sequelize.query(
                'DELETE FROM data_users WHERE id = ?',
                { type: sequelize.QueryTypes.DELETE, replacements: [userId], transaction }
            );
        } else {
            console.error('Invalid user type');
            return res.status(400).send('Invalid user type');
        }

        // Commit transaksi jika semua operasi berhasil
        await transaction.commit();
        console.log(`User with ID: ${userId} successfully deleted`);
        fetchUsers(req, res); // Memperbarui daftar pengguna setelah menghapus
    } catch (error) {
        // Rollback transaksi jika terjadi kesalahan
        if (transaction) await transaction.rollback();
        console.error('Error deleting user:', error);
        res.status(500).send('Failed to delete user');
    }
};
