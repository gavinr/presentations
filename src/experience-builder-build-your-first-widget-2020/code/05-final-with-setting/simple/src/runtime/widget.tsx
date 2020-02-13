/** @jsx jsx */
import { AllWidgetProps, BaseWidget, jsx } from "jimu-core";
import { IMConfig } from "../config";

// import { TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'jimu-ui';
import defaultMessages from "./translations/default";
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import { Extent } from "esri/geometry";

interface IState {
  jimuMapView: JimuMapView;
  latitude: number;
  longitude: number;
}

export default class Widget extends BaseWidget<
  AllWidgetProps<IMConfig>,
  IState
> {
  constructor(props) {
    super(props);

    this.state = {
      jimuMapView: null,
      latitude: null,
      longitude: null
    };
  }

  activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      this.setState({
        jimuMapView: jmv
      });

      jmv.view.watch("extent", (evt: Extent) => {
        this.setState({
          latitude: evt.center.latitude,
          longitude: evt.center.longitude
        });
      });
    }
  };

  render() {
    return (
      <div className="widget-demo jimu-widget" style={{ overflow: "auto" }}>
        {this.props.hasOwnProperty("useMapWidgetIds") &&
          this.props.useMapWidgetIds &&
          this.props.useMapWidgetIds.length === 1 && (
            <JimuMapViewComponent
              useMapWidgetIds={this.props.useMapWidgetIds}
              onActiveViewChange={this.activeViewChangeHandler}
            />
          )}

        <div>
          {this.state.latitude && this.state.longitude && (
            <div className="shadow-lg m-3 p-3 bg-white rounded">
              ({this.state.latitude}, {this.state.longitude})
            </div>
          )}
        </div>
      </div>
    );
  }
}
