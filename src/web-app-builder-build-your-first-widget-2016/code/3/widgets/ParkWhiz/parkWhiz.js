import esriRequest from 'esri/request';

export default {
    getLocations: function(lat = 0, lng = 0, apiKey = '') {
        return esriRequest({
            url: 'http://api.parkwhiz.com/search',
            content: {
                key: apiKey,
                lat: lat,
                lng: lng
            }
        });
    }
}
