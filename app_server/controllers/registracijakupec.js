

const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)

};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com';
}

const obrazec = (req, res) => {
  res.render('registracija-kupec', { title: 'Registracija kupca' });
};


module.exports = {
  obrazec
};