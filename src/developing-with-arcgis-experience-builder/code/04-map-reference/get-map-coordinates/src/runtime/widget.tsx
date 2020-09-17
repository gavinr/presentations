/** @jsx jsx */
import { AllWidgetProps, BaseWidget, jsx, FormattedMessage } from 'jimu-core';
import { IMConfig } from '../config';
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";

import defaultMessages from "./translations/default";

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      console.log("JMV: ", jmv);
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

        <p><FormattedMessage id="latitudeLongitude" defaultMessage={defaultMessages.latitudeLongitude}/>: {this.props.config.exampleConfigProperty}</p>
      </div>
    );
  }
}
