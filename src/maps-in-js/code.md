# Code


## Google Maps

Add points:

```
var stations = [
    { lat: 38.635997, lng: -90.262511 }, // CWE
    { lat: 38.633617, lng: -90.251177 }, // cortex
    { lat: 38.629502, lng: -90.235335 }, // Grand
    { lat: 38.647947, lng: -90.285197 } // forest park
  ];
  var markers = [];

  // var infowindow = new google.maps.InfoWindow({
  //   content: "this is a popup"
  // });

  // DROP:
  for (var i = 0; i < stations.length; i++) {
    addMarkerWithTimeout(stations[i], i * 200);
  }

  function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function() {
      var marker = new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP
      });

      // marker.addListener("click", function() {
      //   infowindow.open(map, marker);
      // });

      markers.push(marker);
    }, 2000);
  }

```

## Leaflet

New Point Symbol:

```
  var pointSymbol = {
    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
    url: "https://static.arcgis.com/images/Symbols/Shapes/BlueStarLargeB.png",
    width: "64px",
    height: "64px"
  };
```

## ArcGIS

Add points:

```
```