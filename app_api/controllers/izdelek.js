const mongoose = require('mongoose');
const Izdelek = mongoose.model('Izdelek');

const izdelkiSeznam = (req,res) => {
    Izdelek.find().exec(function (err, seznam) {
        if (err) {
            console.log(err);
            res.status(404).json({"sporočilo": "Napaka pri poizvedbi: " + err});
        } else {
            res.status(200).json(seznam);
        }
    });
};

const izdelkiPreberiIzbrano = (req, res) => {
    var id = req.params.idIzdelka;
    Izdelek.findById(id).exec(function (err, izdelek) {
        if(err) {
         console.log(err);
         res.status(404).json({"sporočilo": "Napaka pri iskanju id izdelka: " + err});
     } else {
        res.status(200).json(izdelek);
     }
    });
};

module.exports = {
    izdelkiSeznam,
    izdelkiPreberiIzbrano
};