* copy parkWhiz.js into `widgets/ParkWhiz`
* copy ParkingInfo.js into `widgets/ParkWhiz`
* cop `ParkingInfo` folder into `widgets/ParkWhiz`
* Update `widget.js`. Snippet:

  ```
  import parkWhiz from './parkWhiz';
  import ParkingInfo from './ParkingInfo';
  ```
  
  ```
  this.mapClickHandler = on(this.sceneView, 'click', (evt) => {
    console.log('CLICKED', evt);
    parkWhiz.getLocations(evt.mapPoint.latitude, evt.mapPoint.longitude, this.config.apiKey).then((locations) => {
      console.log('locations', locations);
    });
  });
  ```
