const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//imports
const usuarios = require('./routes/usuarios');
const email = require('./routes/email');
//settings
app.set('port', 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//routes
app.use(usuarios);
app.use(email);

app.use(express.static('src/img'));




//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
})