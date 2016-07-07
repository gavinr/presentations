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
  'dojo/_base/lang',
  "dojo/dom-class",
  'dojo/on',
  "dojo/query",
  "dojo/dom-style",
  /*"jimu/utils",*/
  'jimu/BaseWidget',
  "dojo/throttle",
  "dojo/_base/fx",
  "dijit/focus",
  'dojo/topic',
  'jimu/PanelManager'
], function (declare, lang, domClass, on, query, domStyle, /*jimuUtils,*/ BaseWidget, throttle, baseFx, focus, topic, PanelManager) {
  var clazz = declare([BaseWidget], {
    name: 'FullScreen',
    baseClass: 'jimu-widget-fullScreen',
    domsCache: {
      map: null,
      doc: null
    },
    ACTION: {
      HIDE: "hide",
      SHOW: "show"
    },
    MODE: {
      RESTORE: "restore",
      MAXIMIZE: "maximize"
    },
    status: {
      lastState: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      _mouseX: -1,
      _mouseY: -1
    },
    timer: null,

    startup: function () {
      this.domsCache = {
        doc: this._getDocument(),
        map: this.sceneView.container
      };
      this.status.state = this.MODE.RESTORE;
      //this._getBrowser();
      //init btn style
      domClass.add(this.fullScreenBtn, this.status.state);
      //click btn fullscreened, and then press F11 restore. At that time must handle event manually.
      this.own(on(this.domsCache.doc, 'webkitfullscreenchange,mozfullscreenchange,MSFullscreenChange,fullscreenchange',
        lang.hitch(this, '_onFullScreenChangeEvent')));
      this.own(on(this.domsCache.map, "mousemove", throttle(lang.hitch(this, this._setTimerByMouseMove), 100)));
      this.own(topic.subscribe('changeMapPosition', lang.hitch(this, this._changeMapPositionHandler)));
    },

    _onFullScreenClick: function () {
      this._toggleFullScreen();
    },
    // will be triggered after manual execute *requestFullScreen(), ONLY
    _onFullScreenChangeEvent: function () {
      if (false === this._isFullScreen(this.domsCache.doc)) {
        this.status.state = this.MODE.RESTORE;
        this._toggleFullScreen(this.status.state);
      } else {
        this.status.state = this.MODE.MAXIMIZE;
      }
      this._toggleBtnIcon();
      this._setTimerByMouseMove("noSetTimer");
    },

    // hide widgets , when long time no move
    _setTimerByMouseMove: function(evt){
      if (!this._isMouseMoved(evt)) {
        return;
      }

      if (this.timer) {
        this._toggleItems(this.ACTION.SHOW);
        window.clearTimeout(this.timer);
        this.timer = null;
      }
      if (this.status.state === this.MODE.MAXIMIZE) {
        var that = this;
        this.timer = window.setTimeout(function () {
          that._toggleItems(that.ACTION.HIDE);
        }, 2000);
      }
    },

    //always need the document of topWindow( jimu.tokenUtilis.InConfigOrPreviewWindow()+isInBuilderWindow())
    _getDocument: function () {
      return window.top.document;
    },
    //fix internal toggle , when mousePointer stop on icons
    _isMouseMoved: function (evt) {
      if (evt && evt.pageX && evt.pageY) {
        if (this.status._mouseX === evt.pageX && this.status._mouseY === evt.pageY) {
          return false;
        } else {
          this.status._mouseX = evt.pageX;
          this.status._mouseY = evt.pageY;
          return true;
        }
      } else if ("noSetTimer" === evt) {
        return true;
      }
    },
    // when a input is in typing , don't hide any widget
    _isAnyInputOnFocus: function (action) {
      if (action === this.ACTION.HIDE) {
        var allInputs = query("input");
        for (var i = 0, len = allInputs.length; i < len; i++) {
          if (focus.curNode === allInputs[i]) {
            return true;
          }
        }
      }
      return false;
    },
    // PanelManager change the position val and then publish "changeMapPosition" event.
    // so subscribe it & set all the val to 0
    _changeMapPositionHandler: function (pos) {
      if (pos && (0 !== pos.left || 0 !== pos.top) &&
        this.status.state === this.MODE.MAXIMIZE) {
        domStyle.set(this.domsCache.map, "top", "0px");
        domStyle.set(this.domsCache.map, "right", "0px");
        domStyle.set(this.domsCache.map, "bottom", "0px");
        domStyle.set(this.domsCache.map, "left", "0px");
      }
    },


    //top/right/bottom/left of map
    _toggleMapPosition: function (mode) {
      if (this._isFullScreen(this.domsCache.doc) || mode === this.MODE.RESTORE) {
        domStyle.set(this.domsCache.map, "top", this.status.lastState.top);
        domStyle.set(this.domsCache.map, "right", this.status.lastState.right);
        domStyle.set(this.domsCache.map, "bottom", this.status.lastState.bottom);
        domStyle.set(this.domsCache.map, "left", this.status.lastState.left);
      } else {
        this._getPositionEndWithPx("top");
        this._getPositionEndWithPx("right");
        this._getPositionEndWithPx("bottom");
        this._getPositionEndWithPx("left");
        domStyle.set(this.domsCache.map, "top", "0px");
        domStyle.set(this.domsCache.map, "right", "0px");
        domStyle.set(this.domsCache.map, "bottom", "0px");
        domStyle.set(this.domsCache.map, "left", "0px");
      }
    },
    //position = num + "px"
    _getPositionEndWithPx: function (pos) {
      if (pos) {
        var val = domStyle.get(this.domsCache.map, pos);
        if (typeof val === "number" ||
          (typeof val === "string" && !val.endWith("px"))) {
          val = val + "px";
        }
        this.status.lastState[pos] = val;
      }
    },
    _toggleBtnIcon: function () {
      domClass.toggle(this.fullScreenBtn, "restore");
      domClass.toggle(this.fullScreenBtn, "maximize");
    },
    _toggleFullScreen: function (mode) {
      this._toggleMapPosition(mode);
      if (this._isFullScreen(this.domsCache.doc) || mode === this.MODE.RESTORE) {
        if(this.timer){
          window.clearTimeout(this.timer);
          this.timer = null;
        }
        this._toggleItems(this.ACTION.SHOW);
        this._cancelFullScreen(this.domsCache.doc);

        var that = this;
        window.setTimeout(function () {
          that._toggleItems(that.ACTION.SHOW, true);
        }, 500);
      } else {
        this._launchFullScreen(this.domsCache.map);
      }
    },

    _toggleItems: function (action, isForceShow) {
      if (true === this._isAnyInputOnFocus(action) && !isForceShow) {
        return;
      }

      this._toggleWidgetsAndPanels(action);
      //toggle placeholders
      this._toggleItemsByMode(query(".jimu-widget-placeholder"), action);
      this._toggleItemsByMode(query(".jimu-widget-onscreen-icon"), action);
    },
    _toggleItemsByMode: function (items, action) {
      for (var i = 0, lenI = items.length; i < lenI; i++) {
        var item = items[i];
        if (action === this.ACTION.SHOW) {
          domStyle.set(item, "display", "block");
          baseFx.fadeIn({node: item, duration: 500}).play();
        } else {
          this._fadeOutItem(item);
        }
      }
    },

    _toggleWidgetsAndPanels: function(action){
      var widgets = this.widgetManager.getOffPanelWidgets().filter(function(w){
        return w.state !== 'closed';
      });
      var panels = PanelManager.getInstance().panels.filter(function(p){
        return p.state !== 'closed';
      });
      var items = [].concat(widgets, panels);
      if (action === this.ACTION.SHOW) {
        items.forEach(function(item){
          domStyle.set(item.domNode, "display", "block");
          baseFx.fadeIn({node: item.domNode, duration: 500}).play();
        });
      }else{
        items.forEach((function(item){
          this._fadeOutItem(item.domNode);
        }).bind(this));
      }
    },

    //jslint Don't let functions within loop
    _fadeOutItem: function(item){
      var fadeOut = baseFx.fadeOut({node: item, duration: 500}).play();
      on(fadeOut, "End", function () {
        domStyle.set(item, "display", "none");
      }, true);
    },


    //fullscreen element is in the window.top.doc
    _isFullScreen: function (element) {
      return !(!element.fullscreenElement &&
        !element.mozFullScreenElement &&
        !element.webkitFullscreenElement &&
        !element.msFullscreenElement);
    },
    //in iframe , allowfullscreen="true" is necessary
    _launchFullScreen: function (element) {
      if (element.requestFullScreen) {
        element.requestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else {
        return false;
      }
    },
    _cancelFullScreen: function (element) {
      if (element.exitFullscreen) {
        element.exitFullscreen();
      } else if (element.mozCancelFullScreen) {
        element.mozCancelFullScreen();
      } else if (element.webkitCancelFullScreen) {
        element.webkitCancelFullScreen();
      } else if (element.msExitFullscreen) {
        element.msExitFullscreen();
      } else {
        return false;
      }
    }
  });

  return clazz;
});
