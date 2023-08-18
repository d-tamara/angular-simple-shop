const list = document.getElementById("prazniki");
var url = "https://teaching.lavbic.net/api/prazniki/iskanje/leto/2020";

var today = new Date();
// today.setHours(0,0,0,0);

fetch(url)
    .then(response => response.json())
    .then(data => {
                      // console.log(data);
    data.forEach(function (item) {
    var li = document.createElement('li');
    li.innerText = item.danVTednu + ", " + item.dan + "." + item.mesec + "." + item.leto + " " + "("+ item.imePraznika + ")";
    var datum = item.dan + "." + item.mesec + "." + item.leto;
    var datum_ok = new Date(datum)
    if(item.delaProstDan) {
        // if(datum_ok >= today) {
            list.appendChild(li);
    }
    });//   dataList.appendChild(option);
});