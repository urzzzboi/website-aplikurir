import { sequelize } from '../models/model.js';

export const getHistory = async (req, res) => {
    try {
        const kurirs = await sequelize.query('SELECT * FROM data_kurir', {
            type: sequelize.QueryTypes.SELECT
        });
        kurirs.sort((a, b) => a.nama.localeCompare(b.nama));

        const selectedKurirId = req.query.kurirId || (kurirs.length > 0 ? kurirs[0].id_kurir : null);

        const filterDate = req.query.date || '';

        let selectedKurir = null;
        let packages = [];

        if (selectedKurirId) {
            selectedKurir = await sequelize.query('SELECT * FROM data_kurir WHERE id_kurir = :selectedKurirId', {
                replacements: { selectedKurirId },
                type: sequelize.QueryTypes.SELECT
            });

            let query = `
                SELECT r.nomor_resi, r.Nama_Penerima, r.Alamat_Tujuan, r.status_pengiriman
                FROM riwayat r
                WHERE r.id_kurir = :selectedKurirId
            `;

            const queryParams = { selectedKurirId };

            if (filterDate) {
                query += ' AND r.tanggal_pengiriman = :filterDate';
                queryParams.filterDate = filterDate;
            }

            packages = await sequelize.query(query, {
                replacements: queryParams,
                type: sequelize.QueryTypes.SELECT
            });
        }

        res.render('page/admin/riwayat', {
            kurirs,
            selectedKurir: selectedKurir ? selectedKurir[0] : null,
            packages,
            filterDate
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
