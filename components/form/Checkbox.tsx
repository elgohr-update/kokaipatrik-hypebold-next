import { ChangeEvent, Component } from 'react';

type CheckboxProps = {
  name: string;
  title: string;
  onChange: any;
};

type CheckboxState = {
  value: boolean;
};

class Checkbox extends Component<CheckboxProps, CheckboxState> {
  constructor(props: any) {
    super(props);
  }

  public state: CheckboxState = {
    value: false,
  };

  public render() {
    return (
      <div className="form-group">
        <label className="form-checkbox-container">
          {this.props.title}
          <input
            type="checkbox"
            className="form-checkbox-input"
            name={this.props.name}
            onChange={this.handleChange}
          />
          <span className="form-checkbox-mark"></span>
        </label>
      </div>
    );
  };

  public handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: !this.state.value });
    this.props.onChange(e.target.name, !this.state.value);
  };
}

export default Checkbox;
