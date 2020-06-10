/** @jsx jsx */
import { AllWidgetProps, BaseWidget, jsx } from "jimu-core";
import { IMConfig } from "../config";
import defaultMessages from "./translations/default";
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import * as FeatureLayer from "esri/layers/FeatureLayer";

interface IState {
  jimuMapView: JimuMapView;
  featureLayerOnMap: FeatureLayer;
}

export default class Widget extends BaseWidget<
  AllWidgetProps<IMConfig>,
  IState
> {
  constructor(props) {
    super(props);

    this.state = {
      jimuMapView: undefined,
      featureLayerOnMap: undefined,
    };
  }

  // Translations:
  nls = (id: string) => {
    return this.props.intl
      ? this.props.intl.formatMessage({
          id: id,
          defaultMessage: defaultMessages[id],
        })
      : id;
  };

  selectChangeHandler = (evt) => {
    if (this.state.jimuMapView) {
      if (this.state.featureLayerOnMap) {
        // Remove the old Feature Layer
        this.state.jimuMapView.view.map.remove(this.state.featureLayerOnMap);
        this.setState({
          featureLayerOnMap: undefined,
        });
      }
      if (evt.target.value && evt.target.value !== "") {
        // Create and add the new Feature Layer
        const featureLayer = new FeatureLayer({
          url: evt.target.value,
        });
        this.state.jimuMapView.view.map.add(featureLayer);
        this.setState({
          featureLayerOnMap: featureLayer,
        });
      }
    } else {
      console.error(
        "You probably need to choose you map in the settings panel."
      );
    }
  };

  render() {
    return (
      <div className="widget-demo jimu-widget">
        {this.props.hasOwnProperty("useMapWidgetIds") &&
          this.props.useMapWidgetIds &&
          this.props.useMapWidgetIds.length === 1 && (
            // The JimuMapViewComponent gives us a connection to the
            // ArcGIS JS API MapView object. We store it in the State.
            <JimuMapViewComponent
              useMapWidgetIds={this.props.useMapWidgetIds}
              onActiveViewChange={(jmv: JimuMapView) => {
                this.setState({
                  jimuMapView: jmv,
                });
              }}
            />
          )}
        <p className="shadow-lg m-3 p-3 bg-white">
          {this.nls("viewLayer")}:
          <select
            style={{ maxWidth: "100%" }}
            onChange={(evt) => {
              this.selectChangeHandler(evt);
            }}
          >
            <option value=""></option>
            {this.props.config.layerUrls.map((url) => {
              return <option value={url}>{url}</option>;
            })}
          </select>
        </p>
      </div>
    );
  }
}
