<b>BUYLOCAL<b>

Spletna aplikacija prodaje in nakupovanja domačih izdelkov - od domačih pridelkov (zelenjava, sadje, meso) do domačih napitkov (mošt, vino, sadni sirupi in sokovi).

Ob vstopu se je na aplikacijo potrebno registrirati ali vpisati, možnosti sta dve: kot prodajalec ali pa kot kupec.

Prodajalec na spletno aplikacijo registrira svojo “trgovino/kmetijo” in objavi ponudbo ter zalogo izdelkov. To lahko sproti ureja in izdelke dodaja/briše, odvisno od njegove zaloge. Prodajalec ima pregled tudi nad prejetimi naročili.

Kupec na spletni aplikaciji brska po seznamu in/ali zemljevidu lokalnih ponudnikov, oziroma išče glede na željen izdelek. Vse izbrane artikle ob koncu nakupovanja najde v zabojčku, kjer lahko pregleda svoje naročilo. Ko se odloči za nakup, vnese podatke za dostavo (osebni podatki). Naročeno lahko plača prek aplikacije ali ob prevzemu.

PRIJAVA IN REGISTRACIJA
Uporabnik spletne aplikacije se lahko prijavi kot kupec ali prodajalec. 
Za prijavo je potrebno vnesti e-mail naslov in nastavljeno geslo uporabnika, ki se nato potrdi s klikom na gumb "Prijava". 
Če uporabnik še ni registriran, to lahko opravi s klikom na gumb "Registracija" ali pa na "Registrirajte se" če je po pomoti že vstopil na prijavno stran. 
Aplikacija omogoča, da do nje dostopajo tudi uporabniki brez predhodne prijave, ki pa si lahko tudi ogledujejo izdelke in kmetije, vendar pri načinu dostopanja do aplikacije kot gost vam bo možnost izvedba naročila prikrajšana.

PREGLED IZDELKOV
Prodajalcu za pregled celotne ponudbe njegove kmetije je omogočen dostop do strani, kjer so po kategorijah razvrščeni njegovi izdelki v prodaji. 
Preko tega vmesnika lahko poljubno dostopa do izvajanje osnovnih operacij nad izdelki v prodaji, kot je na primer klik na gumb "Uredi" ali pa brisanje le-teh s klikom na gumb "Izbriši". 
Na voljo mu je tudi gumb "Dodaj nov izdelek", ki je prisoten ob vsaki navedeni kategoriji, za vsak izdelek pa je zapisana trenutna količina izdelka, ki je na voljo v prodaji.
Pod vsemi kategorijami mu je prikazan pregled zgodovine naročil kupcev ter osnovnih podatkov o kmetiji in zmožnost urejanja le-teh, ki so uporabljeni kot kontaktni podatki v primeru komunikacije med kupcom in prodajalcem.

DODAJANJE IZDELKOV
Stran, ki omogoča prodajalcu, da v svojo prodajo doda nov izdelek. Za uspešno dodan izdelek v ponudbo prodajalca se morajo izpolniti vsa obvezna polja, kjer se navedejo kategorija, ime in cena izdelka ter začetna razpoložjiva količina (v kilogramih) na zalogi, ko bo izdelek dodan v prodajo. 
Preden se še doda nov izdelek v prodajo, lahko tudi prodajalec obkljuka, da le-ta ni uvožen in se prideluje izključno samo na kmetiji prodajalca. 

UREJANJE IN BRISANJE IZDELKOV
Ko prodajalec klikne na gumb "Uredi" za posamezni izdelek, mu je predstavljen vmesnik, ki prikaže ime in sliko izbranega izdelka, zraven pa sta navedena osnovna podatka trenutne cene in količine, ki je na voljo. 
Lahko poljubno spreminja ceno (zapisana v enoti eur/kg) ter obstoječo količino izdelka v trgovini, lahko pa si tudi izbere opcijo, ki izdelek odstrani iz prodaje oziroma ga ni več na voljo na zalogi.

IZPIS SEZNAMA IN MASTER/DETAIL VZOREC
Kupec lahko na svojem profilu na izpisanem seznamu preveri nedavno zgodovino naročil, omogočen pa mu je tudi podroben vpogled posameznega naročila.
Prav tako lahko kupec iz seznama kmetij izbere s klikom poljubno kmetijo, na zemljevidu pa se mu prikaže njena lokacija, odpiralni časi in ostale podrobnosti, ki bi ga morda zanimale.

ISKANJE
V celotni aplikaciji je omogočeno globalno brskanje in iskanje izdelka preko spletnega iskalnika, ki se nahaja znotraj navigacijskega menija, poleg tega pa lahko uporabnik brska med izdelki tudi preko za to namenjenega vnosnega polja na domači strani.
Omogočeno je tudi brskanje med kmetijami, in sicer na strani pregleda vseh kategorij teh prikaza seznama vseh sodelujočih kmetij.

ZUNANJI VIR
Kot zunanji vir bo v spletno aplikacijo dodan interaktivni zemljevid, ki bo v celoti imel nazorno prikazane vse lokacije kmetij oziroma prodajalcev. 
Kupec bo tako lahko s klikom na poljubno izbrano točko kmetije pridobil informacije o lokaciji posesti, delovnem času, kontaktne informacije in tudi bližnjica za navodila za pot. 
Poleg zemljevida pa je naveden tudi seznam kmetij, po katerem bodo uporabniki lahko tudi iskali z vnosom ključnih besed.

ODDAJA NAROČILA
Na strani oddaje in pregleda naročila ima uporabnik kot kupec na voljo pregled nad vsemi izdelki, vred z željeno izbrano količino, ki jih je dodal v svojo košarico med nakupovanjem in iskanjem iz celotne ponudbe. 
Tu nato izbira med različnimi načini plačila, po temu pa je primoran vnesti v vsa polja potrebne podatke za dostavo, kot so ime, priimek, poštna številka in mesto, naslov ter ostale potrebne informacije za obdelavo naročila (na primer v primeru plačila s kartico je potrebno vnesti podatke o bančni kartici). 
S klikom na gumb "Oddaj naročilo" kupec potrdi svojo izbiro naročila in plačila, stran pa ga obvesti, da je bilo naročilo uspešno oddano.

KATEGORIJE IZDELKOV
Ponudba na spletni strani se razvršča v 4 kategorije: sadje, zelenjavo, pijače in ostale pridelke. 
Klik na posamezno kategorijo prikaže vse izdelke, ki so trenutno na voljo v prodaji. 
Pri izbiranju izdelkov s klikom na gumb "O izdelku" nam odpre spletno stran, ki vsebuje simbolično sliko izdelka, ob strani pa je prikazan seznam vseh kmetij, ki imajo trenutno izbran izdelek na voljo in njegovo ceno. 


Za vse spletne obrazce in uporabniška vnosna polja imamo v rabi atribut required ter checkValidation() znotraj skripte.js, ki na obrazec kliče funkcije checkValidity(). V primeru klika
na gumb tipa submit znotraj obrazca z neko akcijo s praznimi vnosnimi polji pride do preprečitve le-tega privzetega dogodka. Prav tako za uporabniška vnosna polja (pri registraciji in prijavi) epošte zahteva,
da vnesemo poljuben niz na levi in desni strani obveznega znaka @, prav tako pa imamo v uporabi atributa minlength="8" pri vnosnih poljih za geslo, ki uporabnika
poziva, naj za geslo vnese vsaj za 8 simbolov dolg niz. Dokler te pogoji niso zadoščeni (ter Regex validacije, ki so navedene spodaj) se nobena privzeta akcija spletnega
obrazca nebo izvršila.

REGEX
Na spletni strani nakup.hbs mora kupec izpolniti vse potrebne podatke za dostavo naročenega zabojčka. Ob kliku na "Oddaj naročilo" iz modalnega okna se zaženejo regularni izrazi, ki preverjajo štiri vnosna polja, ki morajo nujno vsebovati pravilno formatiran uporabniški vnos. 
Regularen izraz v splošnem preverja vnos poštne številke naslova, če ustreza zapisu 4-mestne številke. Ob primeru plačila s kartico regularni izrazi preverjajo še, če: vnešen CVV ustreza 3-mestno številskem zapisu, vnešena številka kartice štirikratnem ponavljanju 4-mestnih številk, ločenih s presledkom in vnesen rok veljavnosti
ustreza formatu dvomestni številki meseca (npr. februar mora biti 02) ter dvomestni številki zadnjih dveh števk leta roka poteka, ločenih s poševnico. Za vsak napačen vnos, ki ne ustreza
regularnem izrazu, brskalnik uporabnika opozori na nepravilen vnos določenega vnosnega polja, in mu tudi njegov vnos ponastavi, poleg tega pa se ustavijo vsi privzeti dogodki (prekine preusmeritev na domačo spletno stran ob uspešno oddanem naročilu).
V nasprotnem primeru (uspešna validacija teh vnosov) pa uporabniku javi, da je uspešno oddano naročilo in ga preusmeri na privzeto domačo stran.

Na spletni strani kjer prodajalec ureja svoje kontakne podatke kmetije, se pri vnosnem polju za telefonsko številka zažene regularni izraz, ki preverja
če vnešena številka ustreza zapisu trikratnem ponavljanju 3-mestnega številskega zapisa, kjer so tri števke bodisi ločene s presledkom bodisi brez. Ob napačno
vneseni telefonski številki se vsi privzeti dogodki preprečijo, v nasprotnem primeru pa uporabniku naznani, da so se uspešno shranili podatki.

Na spletni strani kjer se uporabnik registrira kot prodajalec mora ob vnosu podatkov pri registraciji vnesti pravilen zapis poštne številke kmetije, torej 4-mestni izrazi sestavljen iz le številk.
Ob kliku na gumb registracija se ob napačno vnešeni številki javi uporabniku nepravilen vnos ter ponastavitev tega vnosnega polja in preprečitev privzetega dogodka registracije, ob pravilnem vnosu vendar ostalih poljih praznih se javi
uporabniku, naj izpolne vsa ostala vnosna polja.

DODATNA NPM JS KNJIŽNICA
Znotraj datoteke package.json je vidna uporaba Helmet knjižnice iz strani https://www.npmjs.com/. Znotraj app.js se preko poljubne spremenljivke sklicujemo na npm paket preko require('helmet'), 
ki se nato uporabi kot parameter znotraj klica app.use(). Uporaba te knjižnice služi kot pomoč pri dodajanju varnostnih predpisov v obliki raznih HTTP glav za zagotavljanje boljše varnosti 
pri vzpostavljanju povezav preko Express aplikacije.


***NAVODILA ZA ZAGON APLIKACIJE***
V Heroku okolju aplikacijo zaženemo na povezavi https://buylocal-heroku.herokuapp.com/

Za AWS Cloud9:
V AWS Cloud9 okolju odpremo nov projekt in vanj uvozimo celotno mapo projekta z ukazom:
$ git clone https://github.com/d-tamara/angular-simple-shop
$ npm install
$ npm start
Za lokalno zaganjanje v AWS okolju izberemo Preview in spodaj prikazano aplikacijo prikažemo v novem zavihku, s klikom na gumb z dvemi okni.

Za Docker:
V Docker okolju odpremo nov projekt in vanj uvozimo celotno mapo projekta z ukazom: (ukazni znak se avtomatsko dodeli glede na privzeto lupino operacijskega sistema)
$ git clone https://github.com/d-tamara/angular-simple-shop
$ npm install
$ npm start
Za lokalno zaganjanje v Docker okolju odpremo brskalnik in v iskalno vrstico vpišemo naslov http://localhost:3000/.

***NAVODILA ZA ZAGON APLIKACIJE***
V Heroku okolju aplikacijo zaženemo na povezavi https://buylocal-heroku.herokuapp.com/
Lokalno odpremo nov projekt in vanj uvozimo celotno mapo projekta z ukazom ter sledimo spodnjim ukazom:

$ git clone https://github.com/d-tamara/angular-simple-shop
$ npm install
$ cd app_public
$ npm install
$ cd ..
$ npm install express-jwt --save
$ npm start

V novem terminalu se premaknemo v app_public z ukazom in izvedemo:

$ ng serve --open

Aplikacija Angular se nam v lokalnem okolju odpre na naslovu http://localhost:4200/

*** BRISANJE IN PRIDOBIVANJE BAZE ***
Na povezavi /db se lahko s klikom na gumb "Izbriši vsebino" pobrišejo shranjeni podatki iz baze, s klikom na gumb "Dodaj začetno vsebino" pa se nam postavi začetna baza, s katero uporabnik lahko operira.

***Uporabniki***
Aplikacija Buylocal ponuja uporabo 3 vrstam uporabnikom: **gostu**, **kupcu** in **prodajalcu**. Slednji ima na strani največ funkcionalnosti.
Gost spletno stran lahko pregleduje do te mere, da vidi izdelke, sodelujoče kmetije, se lahko prijavi kot kupec ali prodajalec. 
Kupec, v primerjavi z gostom, vidi še podatke o ceni izdelkov in lahko doda izdelek v zabojček. Prav tako se mu prikaže zabojček z dodanimi izdelki in ima možnost nadaljevati nakup.
Prodajalec lahko na strani prodaja in kupuje, v primerjavi s kupcem, ima pregledno ploščo, kjer vidi svoje podatke o kmetiji, jih lahko posodobi, vidi svoje izdelke in pretekla naročila.
