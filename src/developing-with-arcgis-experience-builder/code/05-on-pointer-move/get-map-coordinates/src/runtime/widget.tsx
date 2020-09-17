/** @jsx jsx */
import { AllWidgetProps, BaseWidget, jsx, FormattedMessage } from 'jimu-core';
import { IMConfig } from '../config';
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";

import defaultMessages from "./translations/default";

import Point = require("esri/geometry/Point");

interface IState {
  latitude: string;
  longitude: string;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, IState> {
  constructor(props) {
    super(props);

    this.state = {
      latitude: "",
      longitude: ""
    };
  }

  activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      jmv.view.on("pointer-move", evt => {
        const point: Point = jmv.view.toMap({
          x: evt.x,
          y: evt.y
        });
        this.setState({
          latitude: point.latitude.toFixed(3),
          longitude: point.longitude.toFixed(3)
        });
      });
    }
  };

  render() {
    return (
      <div className="widget-demo jimu-widget m-2">
        {this.props.hasOwnProperty("useMapWidgetIds") &&
          this.props.useMapWidgetIds &&
          this.props.useMapWidgetIds.length === 1 && (
            <JimuMapViewComponent
              useMapWidgetIds={this.props.useMapWidgetIds}
              onActiveViewChange={this.activeViewChangeHandler}
            />
          )}

        <p><FormattedMessage id="latitudeLongitude" defaultMessage={defaultMessages.latitudeLongitude}/>: {this.state.latitude}, {this.state.longitude}</p>
      </div>
    );
  }
}
