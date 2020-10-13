
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsbmllbHNlbjMzMyIsImEiOiJja2Zxa2ZldTcwYnVqMnVvMDJuZDNqczIwIn0.B83n3OaLcdE4vcOxPMaBXw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/danielnielsen333/ckfqkpwzw25t019livz94f1dv', // stylesheet location
    
center: [11.577, 48.138 ], // starting position [lng, lat]
zoom: 15 // starting zoom
});




/*
@datasæt hentes sådan:
http://api.openweathermap.org/data/2.5/weather?
q=Aarhus
&lang=da
&units=metric
&appid=201d090c9cceacfc8931df89310ebfbb
*/
    
$(document).ready(function() {

    // get the weather data via query URI
    fetch("http://api.openweathermap.org/data/2.5/weather?q=München&lang=da&units=metric&appid=201d090c9cceacfc8931df89310ebfbb").then(response => {
        return response.json();
    }).then(data => {

        // Work with JSON data here
        console.log(data); // show what's in the json

        // solnedgang
        var sunsetMs = data.sys.sunset * 1000; // dato-objektet har brug for millisek. Derfor * 1000
        var sunset = new Date(sunsetMs);

        // Datoformattering @URI < https://www.w3schools.com/js/js_date_methods.asp >
        var sunsetTime = sunset.getHours() + ":" + sunset.getMinutes();

        /*
        --> Prøv selv: 
        --> Tilføj oplysninger om solopgang.
        */

        // append = da. tilføj (noget tilføjes et element med id="result"
        $('#result').append(

            // tilføjer ("append") en div til vejroplysninger
            '<div class="weatherInfo">' +

            // tilføjer bynavn
            '<h1> ' + data.name + ' </h1>' +

            // tilføjer en beskrivelse af vejret lige nu
            '<h2>Vejr: ' + data.weather[0].description + '</h2>' +

            // tilføjer vejrsymbol
            '<figure>' +
            '<img src="images/' + data.weather[0].icon + '.png" alt="Vejrsymbol">' +
            '</figure>' +

            // tilføjer klokkeslet for solens nedgang i vest
            '<p> Solnedgang: ' + sunsetTime + '</p>' +

            // afslutter #weatherInfo taggen
            '</div>'); // .append til #result slut

        // here are the icons: https://openweathermap.org/weather-conditions 

    }).catch(err => {
        // Do something for an error here
        console.log('There was an error ...');
    });

}); // document ready end







$('.img-parallax').each(function(){
  var img = $(this);
  var imgParent = $(this).parent();
  function parallaxImg () {
    var speed = img.data('speed');
    var imgY = imgParent.offset().top;
    var winY = $(this).scrollTop();
    var winH = $(this).height();
    var parentH = imgParent.innerHeight();


    // The next pixel to show on screen      
    var winBottom = winY + winH;

    // If block is shown on screen
    if (winBottom > imgY && winY < imgY + parentH) {
      // Number of pixels shown after block appear
      var imgBottom = ((winBottom - imgY) * speed);
      // Max number of pixels until block disappear
      var imgTop = winH + parentH;
      // Porcentage between start showing until disappearing
      var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
    }
    img.css({
      top: imgPercent + '%',
      transform: 'translate(-50%, -' + imgPercent + '%)'
    });
  }
  $(document).on({
    scroll: function () {
      parallaxImg();
    }, ready: function () {
      parallaxImg();
    }
  });
});