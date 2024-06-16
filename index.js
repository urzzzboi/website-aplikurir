import express from 'express';
import session from 'express-session';
import userRoutes from './routers/root.js';
import { sequelize } from "./models/model.js";

const app = express();
<<<<<<< HEAD
const hostname = '127.0.0.1';
=======
// const hostname = '172.22.171.125';
const hostname = '192.168.1.105';

>>>>>>> aac42aa7a436926a1d89bf4821e07d8fcfcd0830
const port = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'Ini pesan rahasia, sepertinya',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.post('/loginKurir', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Email:', email, 'Password:', password);
    const [user] = await sequelize.query(
      'SELECT * FROM data_users WHERE email = :email AND password = :password', 
      { 
        replacements: { email, password }, 
        type: sequelize.QueryTypes.SELECT 
      }
    );

    if (user) {
      req.session.userId = user.id;
      res.send(user);
    } else {
      res.status(401).send('Email atau password salah');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan pada server');
  }
});

app.get('/dataKurir', async (req, res) => {
  try {
    const results = await sequelize.query('SELECT * FROM data_kurir', { type: sequelize.QueryTypes.SELECT });
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Tidak menampilkan data dari table data_kurir');
  }
});

app.get('/dataPenerimaan', async (req, res) => {
  try {
    const results = await sequelize.query('SELECT * FROM penerimaan_paket', { type: sequelize.QueryTypes.SELECT });
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Tidak menampilkan data dari data penerimaan_paket');
  }
});

<<<<<<< HEAD
app.get('/dataPenerimaan', async (req, res) => {
  try {
    const results = await sequelize.query('SELECT * FROM penerimaan_paket', { type: sequelize.QueryTypes.SELECT });
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Tidak menampilkan data dari table data_penerimaan_paket');
  }
});
=======

>>>>>>> aac42aa7a436926a1d89bf4821e07d8fcfcd0830

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static("public"));

app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server running at ${hostname}:${port}`);
});
