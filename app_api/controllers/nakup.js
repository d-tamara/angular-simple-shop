const mongoose = require('mongoose');
const Nakup = mongoose.model('Kupec');

// izpisovanje podatkov nakupa in zabojcka kupca
const zabojcekSeznam = (req,res) => {
    var id = req.params.idNakupa;
    // console.log(id);
    Nakup.findById(id).exec(function (err, podatki) {
        if(err) {
            console.log(err);
            res.status(404).json({"sporočilo": "Napaka pri iskanju id nakupa: " + err});
        } else {
            res.status(200).json(podatki);
        }

    });
};

module.exports = {
    zabojcekSeznam
};