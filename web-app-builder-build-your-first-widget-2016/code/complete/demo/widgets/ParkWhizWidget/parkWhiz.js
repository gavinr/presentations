define(['esri/request'], function (esriRequest) {
    return {
        getLocations: function getLocations() {
            var lat = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var lng = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var apiKey = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

            return esriRequest({
                url: 'https://crossorigin.me/http://api.parkwhiz.com/search',
                content: {
                    key: apiKey,
                    lat: lat,
                    lng: lng
                }
            });
        }
    };
});
