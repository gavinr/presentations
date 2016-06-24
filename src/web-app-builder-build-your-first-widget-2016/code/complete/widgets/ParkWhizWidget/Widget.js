import declare from 'dojo/_base/declare';
import BaseWidget from 'jimu/BaseWidget';
import on from 'dojo/on';
import parkWhiz from './parkWhiz';
import ParkingInfo from './ParkingInfo';

// esri:
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Graphic from 'esri/Graphic';
import Point from 'esri/geometry/Point';
import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';

// To create a widget, you need to derive from BaseWidget.
export default declare([BaseWidget], {
  baseClass: 'park-whiz-widget',
  /**
   * When the widget opens, set up our click listener on the map.
   */
  onOpen() {
    this.mapClickHandler = on(this.sceneView, 'click', (evt) => {
      if (evt.hasOwnProperty('graphic')) {
        // we clicked on a grpahic so do an identify
        this.showGraphicInWidget(evt.graphic.id);
      } else {
        // didn't click on a graphic. do another query.
        parkWhiz.getLocations(evt.mapPoint.latitude, evt.mapPoint.longitude, this.config.apiKey).then((locations) => {
          if(locations.locations > 0 && locations.parking_listings && locations.parking_listings.length > 0) {
            this.mapLocations(locations.parking_listings);
          } else {
            // no locations. remove current items from map
            this.removeGraphicsLayer();
          }
        });
      }
    });
    
    this.own(this.mapClickHandler);
  },

  /** 
   * When the widget closes, remove the click handler and cleanup.
   */
  onClose(){
    if(this.mapClickHandler) {
      this.mapClickHandler.remove();
    }
    this.removeGraphicsLayer();
  },

  /** 
   * Given an array of locations, place them in a GraphicsLayer on the map.
   */
  mapLocations(locationsArray) {
    // loop through all the locations, adding them to our GraphicsLayer
    const graphicsArray = locationsArray.map((location) => {
      this.removeGraphicsLayer();
      return new Graphic({
        attributes: location,
        geometry: new Point({
          longitude: location.lng,
          latitude: location.lat
        }),
        symbol: new SimpleMarkerSymbol({
          style: "square",
          color: "red",
          size: 15,  // pixels
          outline: {  // autocasts as esri/symbols/SimpleLineSymbol
            color: [ 255, 255, 0 ],
            width: 3  // points
          }
        })
      });
    });

    this.graphicsLayer = new GraphicsLayer({graphics:graphicsArray});
    this.sceneView.map.add(this.graphicsLayer);
  },

  /**
   * Given the graphicId, show the graphic's info in our widget
   */
  showGraphicInWidget(graphicId) {
    // get the selected graphic array:
    var selectedGraphic = this.graphicsLayer.graphics.filter((item) => {
      if(item.id === graphicId) {
        return true;
      }
      return false;
    });
    // If we have the correct number of selections(1), create 
    // our display widget (ParkingInfo) and place it in our WAB widget.
    if(selectedGraphic.length === 1) {
      this.currentParkingInfo = new ParkingInfo({
        attributes: selectedGraphic.getItemAt(0).attributes
      });
      this.currentParkingInfo.placeAt(this.selectedInfoWrapper, 'only');
    }
    
  },

  /**
   * Remove the GraphicsLayer from the map, if it exists.
   */
  removeGraphicsLayer() {
    if (this.graphicsLayer) {
      this.sceneView.map.remove(this.graphicsLayer);
      this.graphicsLayer.destroy();
    }
  }
});
