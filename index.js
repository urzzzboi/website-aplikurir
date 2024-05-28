import express from 'express';
import session from 'express-session';
import userRoutes from './routers/root.js';

const app = express();
const hostname = '127.0.0.1';
const port = 8081;


app.get('/dataUser', async (req, res) => {
  try {
      const results = await sequelize.query('SELECT * FROM data_users', { type: sequelize.QueryTypes.SELECT });
      res.send(results);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'Ini pesan rahasia, sepertinya',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static("public"));

app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server running at ${hostname}:${port}`);
});
