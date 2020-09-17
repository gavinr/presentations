/** @jsx jsx */
import { AllWidgetProps, BaseWidget, jsx, FormattedMessage } from 'jimu-core';
import { IMConfig } from '../config';

import defaultMessages from "./translations/default";

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="widget-demo jimu-widget m-2">
        <p><FormattedMessage id="latitudeLongitude" defaultMessage={defaultMessages.latitudeLongitude}/>: {this.props.config.exampleConfigProperty}</p>
      </div>
    );
  }
}
