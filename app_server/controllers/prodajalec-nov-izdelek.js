const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)

};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com';
}

const obrazec = (req, res) => {
  res.render('prodajalec-nov-izdelek', {
  title: 'Dodaj nov izdelek',
  layout: '../views/layout-prodajalec.hbs',
  glavaStrani: {
          naslov: 'Dodaj nov izdelek'
  }
    
  });
};


module.exports = {
  obrazec
};