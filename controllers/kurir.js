import { sequelize } from "../models/model.js";

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

export const getKurirWithPaket = async (req, res) => {
    const { kecamatan, kelurahan } = req.query;
    try {
        const [results, metadata] = await sequelize.query(
            `SELECT k.id_kurir, k.nama, k.handphone, p.ID_Data_Penerimaan_Paket, p.nomor_resi, p.Nama_Penerima, p.Alamat_Tujuan, p.No_HP_Penerima, p.Deskripsi, p.Berat, p.Dimensi, p.Jumlah_Kiriman 
             FROM data_kurir k 
             LEFT JOIN pengantaran_paket pp ON k.id_kurir = pp.kurir_id 
             LEFT JOIN penerimaan_paket p ON pp.paket_id = p.ID_Data_Penerimaan_Paket
             WHERE k.kecamatan = ? AND k.kelurahan = ?`,
            { replacements: [kecamatan, kelurahan] }
        );
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getListPengantaranPaketData = (req, res) => {
    const { kecamatan, kelurahan } = req.query;
    const query = `
        SELECT
            dk.id_kurir, dk.nama, dk.handphone, pp.ID_Data_Penerimaan_Paket, pp.nomor_resi,
            pp.Nama_Penerima, pp.Alamat_Tujuan, pp.No_HP_Penerima, pp.Deskripsi,
            pp.Berat, pp.Dimensi, pp.Jumlah_Kiriman
        FROM
            data_kurir dk
        LEFT JOIN
            pengantaran_paket dp ON dk.id_kurir = dp.kurir_id
        LEFT JOIN
            penerimaan_paket pp ON dp.paket_id = pp.ID_Data_Penerimaan_Paket
        WHERE
            dk.kecamatan = ? AND dk.kelurahan = ?
    `;

    pool.query(query, [kecamatan, kelurahan], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ error: 'Database query error' });
        }
        console.log(results);
        res.json(results);
    });
};
