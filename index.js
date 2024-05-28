import express from 'express';
import session from 'express-session';
import userRoutes from './routers/root.js';
import actionData from './controllers/user.js;'

const app = express();
const hostname = '172.22.171.125';
const port = 8081;


app.get('/dataUser', actionData);


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
