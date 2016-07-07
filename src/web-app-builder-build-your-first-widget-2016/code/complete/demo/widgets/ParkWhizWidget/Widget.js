define(['dojo/_base/declare', 'jimu/BaseWidget', 'dojo/on', './parkWhiz', './ParkingInfo', 'esri/layers/GraphicsLayer', 'esri/Graphic', 'esri/geometry/Point', 'esri/symbols/SimpleMarkerSymbol'], function (declare, BaseWidget, on, parkWhiz, ParkingInfo, GraphicsLayer, Graphic, Point, SimpleMarkerSymbol) {
  return declare([BaseWidget], {
    baseClass: 'park-whiz-widget',
    onOpen: function onOpen() {
      var _this = this;

      this.mapClickHandler = on(this.sceneView, 'click', function (evt) {
        if (evt.hasOwnProperty('graphic')) {
          // we clicked on a grpahic so do an identify
          _this.showGraphicInWidget(evt.graphic.id);
        } else {
          // didn't click on a graphic. do another query.
          parkWhiz.getLocations(evt.mapPoint.latitude, evt.mapPoint.longitude, _this.config.apiKey).then(function (locations) {
            if (locations.locations > 0 && locations.parking_listings && locations.parking_listings.length > 0) {
              _this.mapLocations(locations.parking_listings);
            } else {
              // no locations. remove current items from map
              _this.removeGraphicsLayer();
            }
          });
        }
      });

      this.own(this.mapClickHandler);
    },
    onClose: function onClose() {
      if (this.mapClickHandler) {
        this.mapClickHandler.remove();
      }
      this.removeGraphicsLayer();
    },
    mapLocations: function mapLocations(locationsArray) {
      var _this2 = this;

      // loop through all the locations, adding them to our GraphicsLayer
      var graphicsArray = locationsArray.map(function (location) {
        _this2.removeGraphicsLayer();
        return new Graphic({
          attributes: location,
          geometry: new Point({
            longitude: location.lng,
            latitude: location.lat
          }),
          symbol: new SimpleMarkerSymbol({
            style: "square",
            color: "red",
            size: 15, // pixels
            outline: { // autocasts as esri/symbols/SimpleLineSymbol
              color: [255, 255, 0],
              width: 3 // points
            }
          })
        });
      });

      this.graphicsLayer = new GraphicsLayer({ graphics: graphicsArray });
      this.sceneView.map.add(this.graphicsLayer);
    },
    showGraphicInWidget: function showGraphicInWidget(graphicId) {
      // get the selected graphic array:
      var selectedGraphic = this.graphicsLayer.graphics.filter(function (item) {
        if (item.id === graphicId) {
          return true;
        }
        return false;
      });
      // If we have the correct number of selections(1), create
      // our display widget (ParkingInfo) and place it in our WAB widget.
      if (selectedGraphic.length === 1) {
        this.currentParkingInfo = new ParkingInfo({
          attributes: selectedGraphic.getItemAt(0).attributes
        });
        this.currentParkingInfo.placeAt(this.selectedInfoWrapper, 'only');
      }
    },
    removeGraphicsLayer: function removeGraphicsLayer() {
      if (this.graphicsLayer) {
        this.sceneView.map.remove(this.graphicsLayer);
        this.graphicsLayer.destroy();
      }
    }
  });
});
