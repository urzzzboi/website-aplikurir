import { sequelize } from "../models/model.js";
import { QueryTypes } from 'sequelize';

export const getPaketByKelurahan = async (req, res) => {
    try {
        const { kelurahan } = req.query;
        const results = await sequelize.query(`SELECT * FROM penerimaan_paket 
             WHERE kelurahan = ? 
             AND ID_Data_Penerimaan_Paket NOT IN (SELECT paket_id FROM pengantaran_paket)`, {
            replacements: [kelurahan],
            type: sequelize.QueryTypes.SELECT
        });
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Tidak dapat mengambil data dari tabel penerimaan_paket');
    }
};

export const getKurirByKelurahan = async (req, res) => {
    const { kelurahan } = req.query;
    try {
        const [results, metadata] = await sequelize.query(
            'SELECT id_kurir, nama, handphone FROM data_kurir WHERE kelurahan = ?',
            { replacements: [kelurahan] }
        );
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const assignPaketToKurir = async (req, res) => {
    const { kurirId, paketIds } = req.body;
    try {
        for (const paketId of paketIds) {
            await sequelize.query(
                'INSERT INTO pengantaran_paket (paket_id, kurir_id) VALUES (?, ?)',
                { replacements: [paketId, kurirId] }
            );
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).send(error.message);
    }
};