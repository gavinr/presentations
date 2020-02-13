import { React, FormattedMessage } from "jimu-core";
import { BaseWidgetSetting, AllWidgetSettingProps } from "jimu-for-builder";
import { IMConfig } from "../config";
import defaultI18nMessages from "./translations/default";
import { JimuMapViewSelector } from "jimu-ui/setting-components";

export default class Setting extends BaseWidgetSetting<
  AllWidgetSettingProps<IMConfig>,
  any
> {
  onExampleConfigPropertyChange = (evt: React.FormEvent<HTMLInputElement>) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(
        "exampleConfigProperty",
        evt.currentTarget.value
      )
    });
  };

  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    });
  };

  render() {
    return (
      <div className="widget-setting-demo">
        <div>
          <FormattedMessage
            id="exampleConfigProperty"
            defaultMessage={defaultI18nMessages.exampleConfigProperty}
          />
          :{" "}
          <input
            defaultValue={this.props.config.exampleConfigProperty}
            onChange={this.onExampleConfigPropertyChange}
          />
          <div>
            Choose Map:
            <JimuMapViewSelector
              onSelect={this.onMapWidgetSelected}
              useMapWidgetIds={this.props.useMapWidgetIds}
            />
          </div>
        </div>
      </div>
    );
  }
}
