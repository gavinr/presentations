import declare from 'dojo/_base/declare';
import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';
import template from 'dojo/text!./ParkingInfo/ParkingInfo.html';

export default declare([_WidgetBase, _TemplatedMixin], {
  baseClass: 'parking-info-widget',
  templateString: template
});