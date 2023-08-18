/* Vrni začetno stran s seznamom lokacij */
const home = (req, res) => {
  res.render('home', { title: 'Domov' });
};


module.exports = {
  home
};