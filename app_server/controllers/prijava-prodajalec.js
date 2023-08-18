/* Vrni začetno stran s seznamom lokacij */
const obrazec = (req, res) => {
  res.render('prijava-prodajalec', { title: 'Prijava prodajalca' });
};


module.exports = {
  obrazec
};