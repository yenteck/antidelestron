
var mymap = L.map('mapsSonabel').setView([31.539753,-85.042551], 4);


// DRAW POLYGONS


var pl;

var noir=[];
var noirStyle = {
    "color": "#000",
    "weight": 5,
    "opacity": 0.80
};

var blanc=[];
var blancStyle = {
    "color": "red",
    "weight": 5,
    "opacity": 0.80
};

for(var i=0;i<states.features.length;i++){

    if(states.features[i].properties.name=="Alabama" || states.features[i].properties.name=="Alaska"
        || states.features[i].properties.name=="Arizona")
        noir.push(states.features[i].geometry);
    else blanc.push(states.features[i].geometry);
}

console.log(noir);

L.geoJSON(noir,{style:noirStyle}).addTo(mymap);
L.geoJSON(blanc,{style:blancStyle}).addTo(mymap);







L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    //subdomains: '0123',
    attribution: '<a href="http://giscience.uni-hd.de/">OPEN DATA</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(mymap);



//
$("#heure-range").on("change", function (e) {

    $("#valBox").html($(this).val())

    var hour=$(this).val();
    var dt=$("#date_input").val();

    dt+=" "+hour+":00";


    //lunch sync

    loadMaps(dt);


})

function  loadMaps(dt){


    $.ajax({
        url:"inc/loadCoupures.php?date="+dt,
        success: function (result) {

            loadCartes(JSON.parse(result));

        }
    })

}

function loadCartes(obj){


    var i= 0,j=0,zones;

    if(obj.length>0){
        blanc=[];
        noir=[];

    }

    $.each(obj, function( key, value ) {
        zones=value.zones;

        for(var j=0;j<states.features.length;j++){

            if(zones.indexOf(states.features[j].properties.name)>-1)
                noir.push(states.features[j].geometry);
            else blanc.push(states.features[j].geometry);
        }

    });
    L.geoJSON(noir,{style:noirStyle}).addTo(mymap);
    L.geoJSON(blanc,{style:blancStyle}).addTo(mymap);
}