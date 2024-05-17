import express from 'express';
import session from 'express-session';

import root_router from './routers/root.js'

const app = express()
const hostname = '127.0.0.1'
const port = 8081;


app.get('/create-user', (req, res) => {
    User.sync({force:true});
        res.send('create db');
})

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'ini adalah kode secret###',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use('/',root_router);
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(port, () => {
console.log(`Server running at ${hostname}:${port}`);
})
