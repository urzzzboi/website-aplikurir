import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import userRoutes from './routers/root.js'
import userController from './controllers/user.js'


const app = express()
const hostname = '127.0.0.1'
const port = 8081;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.use('/', userRoutes);
app.post('/login', userController.auth);
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(port, () => {
console.log(`Server running at ${hostname}:${port}/login`);
})
