import { sequelize } from '../models/model.js';

export const getHistory = async (req, res) => {
    try {
        // Ambil semua kurir
        const [kurirs] = await sequelize.query('SELECT * FROM data_kurir');

        // Urutkan kurirs berdasarkan nama
        kurirs.sort((a, b) => a.nama.localeCompare(b.nama));

        // Ambil ID kurir yang dipilih dari query string atau default ke kurir pertama
        const selectedKurirId = req.query.kurirId || (kurirs.length > 0 ? kurirs[0].id_kurir : null);

        // Ambil tanggal yang dipilih dari query string
        const filterDate = req.query.date || '';

        let selectedKurir = null;
        let packages = [];

        if (selectedKurirId) {
            // Ambil detail kurir yang dipilih
            [selectedKurir] = await sequelize.query('SELECT * FROM data_kurir WHERE id_kurir = :selectedKurirId', {
                replacements: { selectedKurirId }
            });

            // Ambil daftar paket yang dikirim oleh kurir yang dipilih berdasarkan tanggal
            let query = `
                SELECT p.nomor_resi, p.Nama_Penerima, p.Alamat_Tujuan, r.status_pengiriman
                FROM penerimaan_paket p
                JOIN riwayat r ON p.ID_Data_Penerimaan_Paket = r.ID_Data_Penerimaan_Paket
                WHERE r.id_kurir = :selectedKurirId
            `;

            const queryParams = { selectedKurirId };

            if (filterDate) {
                query += ' AND r.tanggal_pengiriman = :filterDate';
                queryParams.filterDate = filterDate;
            }

            [packages] = await sequelize.query(query, {
                replacements: queryParams
            });
        }

        res.render('page/admin/riwayat', {
            kurirs,
            selectedKurir: selectedKurir ? selectedKurir[0] : null,
            packages,
            filterDate
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
