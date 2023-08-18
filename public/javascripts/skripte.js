document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("oddaja").addEventListener("click", checkValidation("form"));
    
    document.getElementById("submitRegistration").addEventListener("click", validacijaPostne);
	document.getElementById("oddajNarocilo").addEventListener("click", validacijaPodatkov);
	document.getElementById("gumbShrani").addEventListener("click", checkPhoneNumber);
	
});

function checkValidation(myForm) {
	var vsaIzpolnjena = document.getElementById('myForm').checkValidity();
	if(!vsaIzpolnjena) {
		event.preventDefault();
		alert('Prosimo izpolnite vsa obvezna polja!');
	}
}

function checkPhoneNumber() {
    var vnesenaTelefonska = document.getElementById("telefonKmetije").value;
    var regPhoneNum = /^\d{3} ?\d{3} ?\d{3}$/;
    if(!(regPhoneNum.test(vnesenaTelefonska))) {
        alert("Napačno vnesena telefonska številka!");
        document.querySelector("#telefonKmetije").value = "";
        event.preventDefault();
    } else {
      alert("Uspešno shranili podatke!");
    }
}
 
function validacijaPostne() {
		var input = document.getElementById('vnosPosteKmetije').value;
		var reg = /^\d{4}$/;
		var pravilno = reg.test(input);
			if(!pravilno) {
				if(input == "") {
					event.preventDefault();
					alert('Prosimo vnesite poštno številko!');
				} else {
					document.getElementById('vnosPosteKmetije').value = "";
					alert('Nepravilen vnos poštne številke kmetije!');
					event.preventDefault();
				}
			} /*else {
				var forma = document.getElementById('registracijaForma');
				var vnosnaPolja = forma.getElementsByTagName('input');
				var uspesnaRegistracija = true;
				for(var i = 0; i < vnosnaPolja.length; i++) {
					if(vnosnaPolja[i].value == "") {
					uspesnaRegistracija = false;
			    }
			}*/
			/*if(!uspesnaRegistracija){
			    alert('Prosimo izpolnite vsa polja!');
			    event.preventDefault();
			}*/
	
}

	
function validacijaPodatkov() {
	stopPropagation();
	var vsaPravilno = true;
	var obveznoValidiranaPolja = document.querySelectorAll("#vnesenCVV, #vnesenaPostnaStevilka, #vnesenaStevilkaKartice, #vnesenRokVeljavnosti");
										
	for(var i = 0; i < obveznoValidiranaPolja.length; i++) {
		var pravilnost = regexCheck(i);
		if(pravilnost == false) {
			//obveznoValidiranaPolja[i].value = "";
			if(vsaPravilno) {
					vsaPravilno = false;
			}
		}
	}
										
										
	if(vsaPravilno) {
		alert("Naročilo oddano!");
		window.location.href = "/";
	} else { 
		event.preventDefault(); 
	}

		//var warning = document.querySelector("opozorilo");
		/*document.getElementById("vnesenCVV").addEventListener("focus", function(dogodek) {
			var besedilo = dogodek.target.getAttribute("warn");
			warning.textContent = besedilo;
											
			});
										
		document.getElementById("vnesenCVV").addEventListener("blur", function(dogodek) {
			warning.textContent = "";
		});*/
	}
								
	function regexCheck(indexPolja) {
		if(indexPolja == 0) { //cvv
			var val = document.getElementById("vnesenCVV").value;
			var reg = /^\d{3}$/;
			var veljavnost = reg.test(val);
			if(!veljavnost) {
				document.getElementById("vnesenCVV").value = "";
				alert('Nepravilen vnos CVV!');
			}
			return veljavnost;
		} else if(indexPolja == 1) {  //postnastevilka
			var val = document.getElementById("vnesenaPostnaStevilka").value;
			var reg = /^\d{4}$/;
			var veljavnost = reg.test(val);
			if(!veljavnost) {
				document.getElementById("vnesenaPostnaStevilka").value = "";
				alert('Nepravilen vnos poštne številke!');
			}
			return veljavnost;
											
		} else if(indexPolja == 2) {			//stevilka kartice
			var val = document.getElementById("vnesenaStevilkaKartice").value;
			var reg = /^\d{4} \d{4} \d{4} \d{4}$/;
			var veljavnost = reg.test(val);
			if(!veljavnost) {
				document.getElementById("vnesenaStevilkaKartice").value = "";
				alert('Nepravilen vnos št. kartice!');
			}
			return veljavnost;
		} else if(indexPolja == 3) { 				//rok veljavnosti
			var val = document.getElementById("vnesenRokVeljavnosti").value;
			var reg = /^\d{2}\/\d{2}$/;
			var veljavnost = reg.test(val);
			if(!veljavnost) {
				document.getElementById("vnesenRokVeljavnosti").value = "";
				alert('Nepravilen vnos roka veljavnosti!');
			}
		return veljavnost;
		}
	}