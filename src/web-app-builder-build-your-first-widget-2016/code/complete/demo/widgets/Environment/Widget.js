///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
    'dojo/_base/declare',
    'jimu/BaseWidget',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/_base/config',
    'esri/core/lang',
    'esri/core/watchUtils',
    'dijit/form/HorizontalSlider',
    'dijit/form/Select',
    'jimu/dijit/CheckBox'
  ], function(declare, BaseWidget, _WidgetsInTemplateMixin, on, lang, html, djConfig, esriLang,
   watchUtils) {

    var clazz = declare([BaseWidget, _WidgetsInTemplateMixin], {

      name: 'Environment',

      baseClass: 'jimu-widget-environment',

      //lighting._lastTimezone:The time zone which map shows
      //lighting.date: The date map uses

      postCreate: function(){
        this.inherited(arguments);

        //init UI
        var date = this._getDateOfLighting();
        //use lighting.date to init monthSelect
        this._initMonthSelect(date);
        //use initialTimeZone to init zoneSelect
        this._initZoneSelect();
        //use lighting.date and GMT to init slider
        this._updateSliderUIByDate(date);

        //bind events
        var lighting = this.sceneView.environment.lighting;
        this.own(on(lighting, "date-will-change", lang.hitch(this, this._onDateWillChange)));
        this.own(on(this.zoneSelect, 'change', lang.hitch(this, this._onZoneSelectChanged)));
        this.own(on(this.monthSelect, 'change', lang.hitch(this, this._onMonthSelectChanged)));
        this.own(on(this.slider, 'change', lang.hitch(this, this._onSliderValueChanged)));
        // this.own(on(lighting, "timezone-will-change", lang.hitch(this, function(evt){
        //   console.log("timezone-will-change: " + evt);
        // })));
        var showShadowContainer = false;
        if(this.sceneView._stage.getRenderParams().shadowMap !== undefined){
          showShadowContainer = true;
          var directShadowLabel = this.nls.directShadow + "&lrm;";
          this.cbxDirect.setLabel(directShadowLabel);
          this.own(watchUtils.init(this.sceneView,
                                "environment.lighting.directShadows",
                                lang.hitch(this, this._onWatchDirectShadows)));
          this.cbxDirect.onChange = lang.hitch(this, this._onDirectShadowChange);
        }else{
          html.setStyle(this.directShadowSection, 'display', 'none');
        }

        if(this.sceneView._stage.getRenderParams().ssao !== undefined){
          showShadowContainer = true;
          var diffuseShadowLabel = this.nls.diffuseShadow + "&lrm;";
          this.cbxDiffuse.setLabel(diffuseShadowLabel);
          this.own(watchUtils.init(this.sceneView,
                                   "environment.lighting.ambientOcclusion",
                                   lang.hitch(this, this._onWatchAmbientOcclusion)));
          this.cbxDiffuse.onChange = lang.hitch(this, this._onDiffuseShadowChange);
        }else{
          html.setStyle(this.diffuseShadowSection, 'display', 'none');
        }

        if(!showShadowContainer){
          html.setStyle(this.shadowContainer, 'display', 'none');
        }
      },

      _setDateOfLighting: function(newDate){
        var date = this._getDateOfLighting();
        if(date.getTime() !== newDate.getTime()){
          this.sceneView.environment.lighting.date = newDate;
        }
      },

      _initZoneSelect: function(){
        var info = this.sceneView.environment.lighting.positionTimezoneInfo;
        var selectedZone = info.hours;

        var options = [];
        var label = "";
        var option = null;
        for(var i = -12; i <= 12; i++){
          label = "GMT";
          if(i < 0){
            label += " ";
          }else if(i === 0){
            label += " ";
          }else if(i > 0){
            label += "+";
          }
          label += i;
          option = {
            value: i + "",//should use string instead of number
            label: label
          };
          options.push(option);
        }
        this.zoneSelect.addOption(options);
        this.zoneSelect.set('value', selectedZone + "");
      },

      _initMonthSelect: function(date){
        var year = date.getUTCFullYear();
        var d;
        for(var i = 0; i <= 11; i++){
          d = new Date(year, i, 15);
          this.monthSelect.addOption({
            value: i,
            label: d.toLocaleString(djConfig.locale, {
              "month": "long"
            })
          });
        }
        this._updateMonthSelectUIByDate(date);
      },

      _updateSliderUIByDate: function(newDate){
        var timeZone = this._getTimeZoneByUI();
        var h = (((newDate.getUTCHours() + timeZone) % 24) + 24) % 24;
        var m = newDate.getUTCMinutes();
        var s = newDate.getUTCSeconds();

        var oldValue = this.slider.get("value");
        var newValue = h + (m / 60) + (s / 3600);
        this._updateSunTimeUIByDate(newDate);
        if(oldValue !== newValue){
          this.slider.set('value', newValue);
        }
      },

      _updateSunTimeUIByDate: function(date){
        var tempDate = new Date(date);
        var timeZone = this._getTimeZoneByUI();
        var h = (((date.getUTCHours() + timeZone) % 24) + 24) % 24;
        tempDate.setHours(h);
        this.sunTime.innerHTML = tempDate.toLocaleString("en-us", {
          "hour": "numeric",
          "minute": "numeric"
        });
      },

      _updateMonthSelectUIByDate: function(date){
        var monthIndex = date.getUTCMonth();
        this.monthSelect.set('value', monthIndex);
      },

      _getDateOfLighting: function(){
        return this.sceneView.environment.lighting.get('date');
      },

      _getDateByUI: function(){
        //return the Date object configured by UI settings
        var date = this._getDateOfLighting();
        var newDate = new Date(date);
        var timeZone = this._getTimeZoneByUI();
        var sliderValue = this.slider.get('value');

        var h = (((Math.floor(sliderValue) - timeZone) % 24) + 24) % 24;
        var m = 60 * (sliderValue - Math.floor(sliderValue));
        var minfrac = m % 1;
        m -= minfrac;
        var s = Math.round(minfrac * 60);

        newDate.setUTCMonth(this.monthSelect.get('value'));
        newDate.setUTCHours(h);
        newDate.setUTCMinutes(m);
        newDate.setUTCSeconds(s);

        return newDate;
      },

      _getTimeZoneByUI: function(){
        return parseInt(this.zoneSelect.get('value'), 10);
      },

      _getPositionTimeZone: function(){
        return this.sceneView.environment.lighting.positionTimezoneInfo.hours;
      },

      _onDateWillChange: function(evt){
        this._updateSliderUIByDate(evt.date);
      },

      _onZoneSelectChanged: function(){
        this.slider.ignoreChangeEvent = true;
        var date = this._getDateOfLighting();
        this._updateSliderUIByDate(date);
      },

      _onMonthSelectChanged: function(){
        var lightingDate = this._getDateOfLighting();
        var newDate = new Date(lightingDate);
        newDate.setUTCMonth(this.monthSelect.get('value'));
        this._setDateOfLighting(newDate);
      },

      _onSliderValueChanged: function(){
        //When Slider UI change, time zone doesn't change but hour is changed.
        //Once hour is changed, we should update date.
        var newDate = this._getDateByUI();
        this._updateSunTimeUIByDate(newDate);

        var ignoreChangeEvent = this.slider.ignoreChangeEvent;

        delete this.slider.ignoreChangeEvent;

        if (ignoreChangeEvent) {
          return;
        }

        this._setDateOfLighting(newDate);
      },

      _onWatchDirectShadows: function(directShadows){
        if(typeof directShadows === 'string'){
          directShadows = directShadows.toLowerCase();
          if(directShadows === 'none'){
            this.cbxDirect.setValue(false);
          }else{
            this.cbxDirect.setValue(true);
          }
        }
      },

      _onWatchAmbientOcclusion: function(ambientOcclusion){
        if(typeof ambientOcclusion === 'string'){
          ambientOcclusion = ambientOcclusion.toLowerCase();
          if(ambientOcclusion === 'none'){
            this.cbxDiffuse.setValue(false);
          }else{
            this.cbxDiffuse.setValue(true);
          }
        }
      },

      _onDirectShadowChange: function(){
        var value = this.cbxDirect.getValue() ? "default" : "none";
        this.sceneView.environment.lighting.set("directShadows", value);
      },

      _onDiffuseShadowChange: function(){
        var value = this.cbxDiffuse.getValue() ? "default" : "none";
        this.sceneView.environment.lighting.set("ambientOcclusion", value);
      }

    });
    return clazz;
  });