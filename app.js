require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');

var passport = require('passport');

var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var compression = require('compression');

//mongo db require 
require('./app_api/models/db');
// require('./app_server/models/db');

//passport
require('./app_api/konfiguracija/passport');

//11.1.3.3 Posodobitev map s pogledi in krmilniki

//var indexRouter = require('./app_server/routes/index');
// var usersRouter = require('./app_server/routes/users');
var indexApi = require('./app_api/routes/index');

//zarad tega ni delal npm start
/*app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});*/


var app = express();

// Preusmeritev na HTTPS na Heroku
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else
      next();
  });
}

// uporaba npm js paketa - DODAJ V README
app.use(
  helmet({contentSecurityPolicy: false,})
);

app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

app.use(passport.initialize());

//tole je da Angular dovoli posredovanje rest api zahtev na druga mesta
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

//app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', indexApi);

var swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Buylocal",
      version: "1.0.0",
      description: "Buylocal REST API"
    },
    license: {
      name: "GNU LGPLv3",
      url: "https://choosealicense.com/licenses/lgpl-3.0"
    },
    contact: {
      name: "Dejan Lavbič",
      url: "https://www.lavbic.net",
      email: "dejan@lavbic.net"
    },
    servers: [
      { url: "http://localhost:8080/api" },
      { url: "https://buylocal-heroku.herokuapp.com/" }
    ]
  },
  apis: [
    "./app_api/models/izdelek-novo.js",
    "./app_api/models/kupec-novo.js",
    "./app_api/models/prodajalec-novo.js",
    "./app_api/routes/index.js"
  ]
};


const swaggerDocument = swaggerJsdoc(swaggerOptions);

indexApi.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
indexApi.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Obvladovanje napak zaradi avtentikacije
app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") {
    res.status(401).json({"sporočilo": err.name + ": " + err.message});
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Odprava varnostnih pomanjkljivosti
// app.disable('x-powered-by');
// app.use((req, res, next) => {
//   res.header('X-Frame-Options', 'DENY');
//   res.setHeader('X-XSS-Protection', '1; mode=block');
//   res.setHeader('X-Content-Type-Options', 'nosniff');
//   next();
// });



app.use(express.static('grafika'));

module.exports = app;

require('./app_server/views/helpers/hbsh.js');





require('./app_api/models/db');
require('./app_api/konfiguracija/passport');



// tole sem dodala za zunanje vire
// var streznik = http.createServer((zahteva, odgovor) => {

//     var preponaVira = "public/"
//     var vir = ""
//     switch (zahteva.url) {
//         case "/":
//             vir = "kategorije-seznam.hbs"
//             break;
//         case "/kmetije":
//             preponaVira = "app_api/models/";
//             vir = "kmetije-mongodb.json"
//             break;
//     }

//     //primer vsebine datoteke seznam_derivatov.json
//     var vsebina = "[{ 'tip': 'Prodajalna derivatov', 'lastnosti': { 'id': 'relation/4065819', 'ulica': 'Kolodvorska ulica', 'stavba': 'da', 'hisna_stevilka': '1', 'naziv': 'Petrol Kolodvorska', 'dobavitelj': 'Petrol', 'roof:material': 'roof_tiles', 'roof:shape': 'gabled', 'tip': 'MultiPoligon' }, 'geometrija': { 'tip': 'Poligon', 'koordinate': [ [ [ 13.7355813, 45.543016 ], [ 13.7352592, 45.5429193 ], [ 13.7355262, 45.5424832 ], [ 13.7355688, 45.542496 ], [ 13.7358483, 45.54258 ], [ 13.7355813, 45.543016 ] ] ] }, 'id': 'relation/4065819' }]";
//     var napaka;


//     if (napaka) {
//         odgovor.write(napaka.message);
//         odgovor.end();
//     } else {

//         if (vir.endsWith("html"))
//             odgovor.writeHead(200, {"Content-Type": "text/html"});
//         else if (vir.endsWith("json")) {
//             odgovor.writeHead(200, {"Content-Type": "application/json"});

//             vsebina = JSON.parse(vsebina).slice(0, 50);
//             vsebina = JSON.stringify(vsebina);
//         }

//         setTimeout(function () {
//             console.log("Po tehtnem razmisleku 2 sekund bom vrnil odgovor odjemalcu.");

//             odgovor.write(vsebina);
//             odgovor.end();
//         }, 2000);
//     }
// });