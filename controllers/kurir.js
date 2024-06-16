import { sequelize } from "../models/model.js";
import { QueryTypes } from 'sequelize';

export const getPaketByKelurahan = async (req, res) => {
    try {
        const { kelurahan } = req.query;
        const results = await sequelize.query('SELECT Nama_Penerima, No_HP_Penerima, Alamat_Tujuan, nomor_resi FROM penerimaan_paket WHERE kelurahan = ?', {
            replacements: [kelurahan],
            type: sequelize.QueryTypes.SELECT
        });
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Tidak dapat mengambil data dari tabel penerimaan_paket');
    }
};


