$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=c084ca644cb8e8497fc14b1b53df3a2b&tags=oslo&per_page=10&page=1&format=json&nojsoncallback=1',

        success: function (data) {
            var id = data.photos.photo[0].id;
            var server = data.photos.photo[0].server;
            var farm = data.photos.photo[0].farm;
            var secret = data.photos.photo[0].secret;


            var id1 = data.photos.photo[1].id;
            var server1 = data.photos.photo[1].server;
            var farm1 = data.photos.photo[1].farm;
            var secret1 = data.photos.photo[1].secret;

            // $("#pic").attr('src', 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_h.jpg');

            // Get time and change background
            var currentTime = new Date().getHours();

            if (7 <= currentTime && currentTime < 20) {
                if (document.body) {
                    document.body.background = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_h.jpg';
                }
            } else {
                if (document.body) {
                    document.body.background = 'https://farm' + farm1 + '.staticflickr.com/' + server1 + '/' + id1 + '_' + secret1 + '_h.jpg';
                }
            }
            console.log(data.photos.photo);
        }
    });
});

