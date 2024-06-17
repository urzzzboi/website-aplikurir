import express from 'express';
import session from 'express-session';
import userRoutes from './routers/root.js';
import { sequelize } from "./models/model.js";

const app = express();
// const hostname = '172.22.171.125';
const hostname = '192.168.1.105';
const port = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'Ini pesan rahasia, sepertinya',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/dataPengantaran', (req, res) => {
  const query = `
    SELECT 
      pp.ID_Data_Pengantaran_Paket,
      pp.ID_Data_Riwayat,
      pp.id_kurir,
      pp.ID_Data_Penerimaan_Paket,
      dk.nama AS nama_kurir,
      dk.handphone AS handphone_kurir,
      dk.email AS email_kurir,
      dk.password AS password_kurir,
      pk.Nama_Pengirim,
      pk.No_HP_Pengirim,
      pk.Deskripsi,
      pk.Berat,
      pk.Dimensi,
      pk.Jumlah_Kiriman,
      pk.Nama_Penerima,
      pk.No_HP_Penerima,
      pk.Alamat_Tujuan,
      pk.kecamatan,
      pk.kelurahan,
      pk.nomor_resi,
      pk.createdAt AS penerimaan_createdAt,
      pk.latitude,
      pk.longitude
    FROM pengantaran_paket pp
    JOIN penerimaan_paket pk ON pp.ID_Data_Penerimaan_Paket = pk.ID_Data_Penerimaan_Paket
    JOIN data_kurir dk ON pp.id_kurir = dk.id_kurir
  `;

  sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.get('/dataPenerimaan', (req, res) => {
  sequelize.query('SELECT * FROM penerimaan_paket', { type: sequelize.QueryTypes.SELECT })
   .then(result => {
      res.send(result);
    })
   .catch(err => {
      console.log(err);
    });
})

app.get('/dataKurir', (req, res) => {
  sequelize.query('SELECT * FROM data_kurir', { type: sequelize.QueryTypes.SELECT })
   .then(result => {
      res.send(result);
    })
   .catch(err => {
      console.log(err);
    });
})



app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static("public"));

app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server running at ${hostname}:${port}`);
});
