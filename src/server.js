const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')


var datosRoutes = require('./handler/datosRouter')
var dataComparisonRoter = require('./handler/dataComparisonRoter')

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {
  res.status(200).json('backend del proyecto <Acercamientos al Agua js, trabajando ESP32> version 0.85!');
});

datosRoutes(app)
dataComparisonRoter(app)

// app.get('*', (req, res) => {
//   res.redirect('/');
// });

app.listen(port,function () {
  console.log(`backend por: http://localhost:${port}/`);
});
