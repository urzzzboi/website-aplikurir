import { sequelize } from "../models/model.js";
import { QueryTypes } from 'sequelize';

export const getPenentuanKurirData = async (req, res) => {
    const user = req.session.user || { email: 'user@example.com' }; // Ganti sesuai dengan data user yang ada di session
    const query = 'SELECT * FROM penerimaan_paket';

    try {
        const results = await sequelize.query(query, { type: QueryTypes.SELECT });
        res.render('page/agen/list-paket', { deliveries: results, user });
    } catch (error) {
        console.error(error);SS
        res.status(500).send('Server error');
    }
        };
    


