const hbs = require('hbs');

hbs.registerHelper("statuszaloge", function(stevilo) {
   let statuszaloge = "";
   if(stevilo < 1) {
      statuszaloge = " Ni na zalogi";
   } 
   else {
      statuszaloge = " Na zalogi";
   }
   return statuszaloge;
});

//debuggerje
hbs.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }
});

hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

//debugger
hbs.registerHelper("log", function(objekt) {
  alert(objekt);
});

/*hbs.registerHelper("validacijaMejla", function(vnesenMejl) {
      var validator = require("email-validator");
		var resnicnostMejla = validator.validate(vnesenMejl);
		if(resnicnostMejla) {
		   return true;
		} else {
		   return false;
		}
});*/

 