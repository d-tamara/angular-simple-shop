const mongoose = require('mongoose');
const PrijavaProdajalec = mongoose.model('PrijavaProdajalec');

const prijavaProdajalecSeznam = (req,res) => {
    PrijavaProdajalec.find().exec(function (err, seznam) {
        if (err) {
            console.log(err);
            res.status(404).json({"sporočilo": "Napaka pri poizvedbi: " + err});
        } else {
            res.status(200).json(seznam);
        }
    });
};

module.exports = {
    prijavaProdajalecSeznam
};