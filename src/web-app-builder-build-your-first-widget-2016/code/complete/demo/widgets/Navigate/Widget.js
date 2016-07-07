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
    'dojo/on',
    'dojo/_base/declare',
    'dojo/_base/html',
    'dojo/_base/lang',
    'jimu/BaseWidget',
    'esri/views/3d/navigation/EventController'
  ], function(on, declare, html, lang, BaseWidget, EventController) {
    var clazz = declare([BaseWidget], {

      name: 'Navigate',
      baseClass: 'jimu-widget-navigate',
      _isPan: true,
      _panClass: "pan",
      _rotateClass: "rotate",

      postCreate: function(){
        this.inherited(arguments);
        this.iconNode = html.create("div", {
          'class': 'control-mode'
        }, this.domNode);

        this.own(on(this.iconNode, 'click', lang.hitch(this, this._onIconNodeClick)));

        this._updateUI();
      },

      _updateUI: function(){
        var controls = this.sceneView.navigationController.getControls();
        html.removeClass(this.iconNode, this._panClass);
        html.removeClass(this.iconNode, this._rotateClass);
        if(controls.mouseDragLeft === 'pan'){
          this._isPan = true;
          html.addClass(this.iconNode, this._panClass);
        }else{
          this._isPan = false;
          html.addClass(this.iconNode, this._rotateClass);
        }
      },

      _onIconNodeClick: function(){
        if(this._isPan){
          //pan -> rotate
          this.sceneView.navigationController.setControls(EventController.TUMBLE);
        }else{
          //rotate -> pan
          this.sceneView.navigationController.setControls(EventController.PAN);
        }
        this._updateUI();
      }
    });

    return clazz;
  });