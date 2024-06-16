import { sequelize } from "../models/model.js";

export const getAllPackages = async (req, res) => {
  try {
    const [packages] = await sequelize.query('SELECT * FROM penerimaan_paket');
    const user = req.session.user;
    res.render('page/halaman-karyawan', { packages, selectedPackage: null, user });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getPackageById = async (req, res) => {
  const packageId = req.params.id;
  try {
    const [packages] = await sequelize.query('SELECT * FROM penerimaan_paket');
    const [selectedPackageArray] = await sequelize.query(
      'SELECT * FROM penerimaan_paket WHERE ID_Data_Penerimaan_Paket = ?',
      { replacements: [packageId] }
    );
    const selectedPackage = selectedPackageArray[0];
    const user = req.session.user; // Ensure user is retrieved from the session
    res.render('page/halaman-karyawan', { packages, selectedPackage, user });
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).send('Internal Server Error');
  }
};