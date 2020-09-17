/** @jsx jsx */
import { React, jsx } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import {
  JimuMapViewSelector,
  SettingSection,
  SettingRow,
} from "jimu-ui/advanced/setting-components";
import { IMConfig } from "../config";

export default class Setting extends React.PureComponent<
  AllWidgetSettingProps<IMConfig>,
  any
> {
  
  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds,
    });
  };

  render() {
    return (
      <div>
        <div className="widget-setting-get-map-coordinates">
          <SettingSection className="map-selector-section" title="Map Widget">
            <SettingRow>
              <JimuMapViewSelector
                onSelect={this.onMapWidgetSelected}
                useMapWidgetIds={this.props.useMapWidgetIds}
              />
            </SettingRow>
          </SettingSection>
        </div>
      </div>
    )
  }
}
