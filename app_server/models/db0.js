const mongoose = require('mongoose');
//var dbURI = 'mongodb+srv://app:fl0rov3tsQR6dRYS@cluster0.tyjao.mongodb.net/Cluster0';

var dbURI = 'mongodb://localhost/test';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_CLOUD_URI;
} else if(process.env.NODE_ENV === 'docker') {
  dbURI = 'mongodb://sp-buylocal-mongodb/';
}

mongoose.connect(dbURI, { 
  useNewUrlParser: true, 
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose je povezan na ${dbURI}.`);
});

mongoose.connection.on('error', napaka => {
  console.log('Mongoose napaka pri povezavi: ', napaka);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose ni povezan.');
});

const pravilnaUstavitev = (sporocilo, povratniKlic) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose je zaprl povezavo preko '${sporocilo}'.`);
    povratniKlic();
  });
};

// Ponovni zagon nodemon
process.once('SIGUSR2', () => {
  pravilnaUstavitev('nodemon ponovni zagon', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Izhod iz aplikacije
process.on('SIGINT', () => {
  pravilnaUstavitev('izhod iz aplikacije', () => {
    process.exit(0);
  });
});

// Izhod iz aplikacije na Heroku
process.on('SIGTERM', () => {
  pravilnaUstavitev('izhod iz aplikacije na Heroku', () => {
    process.exit(0);
  });
});

// uvoz sheme 13.1.3
require('./kmetije');






// stare
// require('./zelenjava');
// require('./sadje');
// require('./pijaca');
// require('./ostalipridelki');

// require('./nakup');

// require('./zabojcek');

// require('./prodajalec-uredi');

// require('./zgodovinanarocila');
// require('./prodajalecpregled');

// require('./prijavakupec')
// require('./registracijakupec')

// require('./prijavaprodajalec')
// require('./registracija-prodajalec');

// require('./zgodovinanarocila');

// require('./prodajalecpregled');

// require('./prodajalec-nov-izdelek');




