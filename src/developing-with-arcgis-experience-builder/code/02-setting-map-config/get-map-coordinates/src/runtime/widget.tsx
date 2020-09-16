/** @jsx jsx */
import { AllWidgetProps, BaseWidget, jsx } from 'jimu-core';
import { IMConfig } from '../config';

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="widget-demo jimu-widget m-2">
        <p>Simple Widget</p>
        <p>exampleConfigProperty: {this.props.config.exampleConfigProperty}</p>
      </div>
    );
  }
}
