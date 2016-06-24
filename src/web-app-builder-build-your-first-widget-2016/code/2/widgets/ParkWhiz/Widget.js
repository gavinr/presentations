import declare from 'dojo/_base/declare';
import BaseWidget from 'jimu/BaseWidget';
import on from 'dojo/on';

// To create a widget, you need to derive from BaseWidget.
export default declare([BaseWidget], {

  // Custom widget code goes here

  baseClass: 'park-whiz',

  // add additional properties here

  // methods to communication with app container:
  postCreate () {
    this.inherited(arguments);
    console.log('ParkWhiz::postCreate');
  },
  // startup() {
  //   this.inherited(arguments);
  //   console.log('ParkWhiz::startup');
  // },
  onOpen() {
    console.log('ParkWhiz::onOpen');
    this.mapClickHandler = on(this.sceneView, 'click', (evt) => {
      console.log('CLICKED', evt);
    });
  },
  onClose() {
    console.log('ParkWhiz::onClose');
    if(this.mapClickHandler) {
      this.mapClickHandler.remove();
    }
  },
  // onMinimize(){
  //   console.log('ParkWhiz::onMinimize');
  // },
  // onMaximize(){
  //   console.log('ParkWhiz::onMaximize');
  // },
  // onSignIn(credential){
  //   console.log('ParkWhiz::onSignIn', credential);
  // },
  // onSignOut(){
  //   console.log('ParkWhiz::onSignOut');
  // }
  // onPositionChange(){
  //   console.log('ParkWhiz::onPositionChange');
  // },
  // resize(){
  //   console.log('ParkWhiz::resize');
  // }
});
