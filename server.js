const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/movies', require('./routes/movies'))

app.listen(port, () => console.log('Server is up and running on ' + port))