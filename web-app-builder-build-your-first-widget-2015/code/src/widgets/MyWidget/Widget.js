define(['dojo/_base/declare', 'jimu/BaseWidget'],
function(declare, BaseWidget) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'my-widget',
    // this property is set by the framework when widget is loaded.
    // name: 'MyWidget',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      console.log('MyWidget::postCreate');
    },

    startup: function() {
      this.inherited(arguments);
      console.log('MyWidget::startup');
    },

    onOpen: function(){
      console.log('MyWidget::onOpen');
    },

    // onClose: function(){
    //   console.log('MyWidget::onClose');
    // },

    // onMinimize: function(){
    //   console.log('MyWidget::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('MyWidget::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('MyWidget::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('MyWidget::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('MyWidget::onPositionChange');
    // },

    // resize: function(){
    //   console.log('MyWidget::resize');
    // }
    zoomIn: function(evt) {
        console.log('zoomIn', evt);
        this.map.setZoom(this.map.getZoom() + 1);
    }
//methods to communication between widgets:

  });

});
