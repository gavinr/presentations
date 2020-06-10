/** @jsx jsx */
import { AllWidgetProps, BaseWidget, jsx } from "jimu-core";
import { IMConfig } from "../config";
import defaultMessages from "./translations/default";

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // Translations:
  nls = (id: string) => {
    return this.props.intl
      ? this.props.intl.formatMessage({
          id: id,
          defaultMessage: defaultMessages[id],
        })
      : id;
  };

  render() {
    return (
      <div className="widget-demo jimu-widget m-2">
        <p>{this.nls("viewLayer")}:</p>
      </div>
    );
  }
}
