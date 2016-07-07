define(['dojo/_base/declare', 'dijit/_WidgetBase', 'dijit/_TemplatedMixin', 'dojo/text!./ParkingInfo/ParkingInfo.html'], function (declare, _WidgetBase, _TemplatedMixin, template) {
  return declare([_WidgetBase, _TemplatedMixin], {
    baseClass: 'parking-info-widget',
    templateString: template
  });
});
