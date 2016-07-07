define(['dojo/_base/declare', 'jimu/BaseWidgetSetting'], function (declare, BaseWidgetSetting) {
  return declare([BaseWidgetSetting], {
    baseClass: 'park-whiz-widget-setting',

    postCreate: function postCreate() {
      // the config object is passed in
      this.setConfig(this.config);
    },
    setConfig: function setConfig(config) {
      this.apiKey.value = config.apiKey;
    },
    getConfig: function getConfig() {
      // WAB will get config object through this method
      return {
        apiKey: this.apiKey.value
      };
    }
  });
});
