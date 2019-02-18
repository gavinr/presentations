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



## ArcGIS


New Point Symbol:

```
  var pointSymbol = {
    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
    url: "https://static.arcgis.com/images/Symbols/Shapes/BlueStarLargeB.png",
    width: "64px",
    height: "64px"
  };
```



Renderer:

Unique Value Renderer:

```
renderer: {
  type: "unique-value",  // autocasts as new UniqueValueRenderer()
  field: "CITY",
  defaultSymbol: { type: "simple-marker", color: "red" },  // autocasts as new SimpleFillSymbol()
  uniqueValueInfos: [{
    // All features with value of "North" will be blue
    value: "St. Louis",
    symbol: {
      type: "simple-marker",  // autocasts as new SimpleFillSymbol()
      color: "blue"
    }
  }, {
    // All features with value of "East" will be green
    value: "Clayton",
    symbol: {
      type: "simple-marker",  // autocasts as new SimpleFillSymbol()
      color: "green"
    }
  }]
},
```

CLASS BREAKS RENDERER:

```
[{
        minValue: 1500,  
        maxValue: 1799,
        symbol: {
          type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
          style: "circle",
          color: "#fee6ce",
          size: "12px"
        },  
        label: "3-5pm"
      },{
        minValue: 1800,  
        maxValue: 2199,
        symbol: {
          type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
          style: "circle",
          color: "#fdae6b",
          size: "12px"
        },  
        label: "6-9pm"
      },{
        minValue: 2200,  
        maxValue: 2400,
        symbol: {
          type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
          style: "circle",
          color: "#e6550d",
          size: "12px"
        },  
        label: "10pm-midnight"
      }]
```