import declare from 'dojo/_base/declare';
import BaseWidgetSetting from 'jimu/BaseWidgetSetting';

export default declare([BaseWidgetSetting], {
  baseClass: 'park-whiz-widget-setting',

  postCreate () {
    // the config object is passed in
    this.setConfig(this.config);
  },

  setConfig (config) {
    this.apiKey.value = config.apiKey;
  },

  getConfig () {
    // WAB will get config object through this method
    return {
      apiKey: this.apiKey.value
    };
  }
});
