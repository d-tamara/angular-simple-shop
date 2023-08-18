const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)

};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com';
}

var prodajalecUredi = (req, res) => {

    var idProdajalca = req.params.id;
    
    axios
        .get(apiParametri.streznik+'/api/prodajalecPregled/'+idProdajalca+'/'+idIzdelka, {})
        .then((odgovor) => {
            res.render('prodajalec-uredi', odgovor.data);
        });

};

 /*const obrazec = (req, res) => {
  var id = req.params.id;
    
    uredi.forEach(function(item, index) {
        if (item.id == id) {
            res.render('prodajalec-uredi', item);
        }
    }
    );
};
*/

module.exports = {
  prodajalecUredi
};