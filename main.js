$(document).ready(function () {

    // $.ajax({
    //     type: 'GET',
    //     url: 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=c084ca644cb8e8497fc14b1b53df3a2b&tags=oslo&per_page=10&page=1&format=json&nojsoncallback=1',

    //     success: function (data) {
    //         var id = data.photos.photo[0].id;
    //         var server = data.photos.photo[0].server;
    //         var farm = data.photos.photo[0].farm;
    //         var secret = data.photos.photo[0].secret;


    //         var id1 = data.photos.photo[1].id;
    //         var server1 = data.photos.photo[1].server;
    //         var farm1 = data.photos.photo[1].farm;
    //         var secret1 = data.photos.photo[1].secret;

    //         // $("#pic").attr('src', 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_h.jpg');

    //         // Get time and change background
    //         var currentTime = new Date().getHours();

    //         if (7 <= currentTime && currentTime < 20) {
    //             if (document.body) {
    //                 document.body.background = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_h.jpg';
    //             }
    //         } else {
    //             if (document.body) {
    //                 document.body.background = 'https://farm' + farm1 + '.staticflickr.com/' + server1 + '/' + id1 + '_' + secret1 + '_h.jpg';
    //             }
    //         }
    //         console.log(data.photos.photo);
    //     }
    // });



    // ---- alternatively use public feed ---- //

    $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
        tags: "oslo, city",
        tagmode: "all",
        format: "json"
    },
        function (data) {

            var image = data.items[0].media.m;
            var imageLarge = image.slice(0, -5) + 'h.jpg';

            document.body.background = imageLarge;
        });
});


// --- Bikes JS --- //


$(document).ready(function () {
    // pass in the location coords
    function location(lat, lon) {

        $.ajax({
            type: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/https://oslobysykkel.no/api/v1/stations',
            headers: {
                'Client-Identifier': '9c15107665f894e8396aabad6c3ed366'
            },
            success: function (data) {
                var check = data.stations.find(checkID);

                $('#location1').html(check.title);

                function checkID(response) {
                    return response.id === 261;
                }
                console.log(check);
            }
        });

        $.ajax({
            type: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/https://oslobysykkel.no/api/v1/stations/availability',
            headers: {
                'Client-Identifier': '9c15107665f894e8396aabad6c3ed366'
            },
            success: function (data) {
                var check = data.stations.find(checkID);

                $('#available1').html("bikes available : " + check.availability.bikes);

                function checkID(response) {
                    return response.id === 261;
                }
                console.log(check);
            }
        });



    }

    //Get Latitude and Longitude

    function success(pos) {
        var crds = pos.coords

        var lat = crds.latitude;
        var lon = crds.longitude;

        location(lat, lon);

        console.log(lat);
        console.log(lon);

    }

    function error(pos) {

        var url = "https://ipinfo.io/geo";
        $.getJSON(url, function (response) {

            var loc = response.loc.split(',');
            var lat = loc[0];
            var lon = loc[1];

            location(lat, lon);
        });

    }
    navigator.geolocation.getCurrentPosition(success, error);




    // ---- Clock JS ---- //


var secondHand = document.querySelector('.second-hand');
var minsHand = document.querySelector('.min-hand');
var hourHand = document.querySelector('.hour-hand');

function setDate() {
    var now = new Date();

    var seconds = now.getSeconds();
    var secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    var mins = now.getMinutes();
    var minsDegrees = ((mins / 60) * 360) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    var hour = now.getHours();
    var hourDegrees = ((hour / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);

setDate();


});
