/* Vrni začetno stran s seznamom lokacij */
const obrazec = (req, res) => {
  res.render('prijava-kupec', { title: 'Prijava kupca' });
};


module.exports = {
  obrazec
};