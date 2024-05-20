import express from 'express';
import session from 'express-session';
import userRoutes from './routers/root.js';

const app = express()
const hostname = '127.0.0.1'
const port = 8081;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.get('/', (req, res) => {
    res.render('login-page');
});
app.use('/', userRoutes);

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(port, () => {
console.log(`Server running at ${hostname}:${port}`);
})
