define(['./BaseVersionManager'],
function(BaseVersionManager) {

  //app version manager manage config and framework version
  function AppWidgetManager(){
    this.versions = [{
      version: '2.0beta',

      description: 'The version for Developer Edition beta 2.0.',

      upgrader: function(oldConfig){
        return oldConfig;
      },
      compatible: true
    }, {
      version: '2.0',

      description: 'The version for Online 4.1.',

      upgrader: function(oldConfig){
        return oldConfig;
      },
      compatible: true
    }, {
      version: '2.0.1',

      description: 'The version for Developer Edition 2.0.',

      upgrader: function(oldConfig){

        renameVizTo3DFx(oldConfig);

        /*******************functions********************/
        function renameVizTo3DFx(oldConfig){
          var widget = null;
          var i = 0;

          var onScreenWidgets = oldConfig.widgetOnScreen.widgets;
          if(onScreenWidgets && onScreenWidgets.length > 0){
            for(i = 0; i < onScreenWidgets.length; i++){
              widget = onScreenWidgets[i];
              if(widget.uri === 'widgets/Viz/Widget'){
                widget.uri = 'widgets/3DFx/Widget';
                widget.name = '3DFx';
              }
            }
          }

          var poolWidgets = oldConfig.widgetPool.widgets;
          if(poolWidgets && poolWidgets.length > 0){
            for(i = 0; i < poolWidgets.length; i++){
              widget = poolWidgets[i];
              if(widget.uri === 'widgets/Viz/Widget'){
                widget.uri = 'widgets/3DFx/Widget';
                widget.name = '3DFx';
              }
            }
          }
        }

        return oldConfig;
      },

      compatible: true
    }];

    this.isCompatible = function(_oldVersion, _newVersion){
      var oldVersionIndex = this.getVersionIndex(_oldVersion);
      var newVersionIndex = this.getVersionIndex(_newVersion);
      var i;
      for(i = oldVersionIndex + 1; i <= newVersionIndex; i++){
        if(this.versions[i].compatible === false){
          return false;
        }
      }
      return true;
    };
  }

  AppWidgetManager.prototype = new BaseVersionManager();
  AppWidgetManager.prototype.constructor = AppWidgetManager;
  return AppWidgetManager;
});