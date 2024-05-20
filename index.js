import express from 'express';
import session from 'express-session';
import userRoutes from './routers/root.js';

const app = express();
const hostname = '127.0.0.1';
const port = 8081;

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static("public"));

app.use('/', userRoutes);

app.get('/', (req, res) => {
  res.render('login-page');
});

app.listen(port, () => {
  console.log(`Server running at ${hostname}:${port}/login`);
});
