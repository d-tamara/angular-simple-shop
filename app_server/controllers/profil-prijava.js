const profil = (req, res) => {
  res.render('profil-prijava', { title: 'Prijava' });
};

const prijavaKupec = (req, res) => {
  res.render('prijava-kupec', { title: 'Prijava' });
};

const registracijaKupec = (req, res) => {
  res.render('registracija-kupec', {title: 'Registracija'});
};

const prijavaProdajalec = (req,res) => {
  res.render('prijava-prodajalec', {title: 'Prijava'});
};

const registracijaProdajalec = (req,res) => {
  res.render('registracija-prodajalec', {title: 'Registracija'});
};

module.exports = {
  profil,
  prijavaKupec,
  registracijaKupec,
  prijavaProdajalec,
  registracijaProdajalec
};