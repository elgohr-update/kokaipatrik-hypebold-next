import { ChangeEvent, Component } from 'react';

import EyeIcon from '@/assets/svg/icons/eye.svg';

type InputProps = {
  type: string;
  name: string;
  title: string;
  onChange: any;
  value?: any;
  eye?: boolean;
};

type InputState = {
  value: string;
  eyeIsActive: boolean;
};

class Input extends Component<InputProps, InputState> {
  constructor(props: any) {
    super(props);
  }

  public state: InputState = {
    value: '',
    eyeIsActive: true,
  };

  public render() {
    return (
      <div className="form-group">
        <input
          type={`${!this.state.eyeIsActive ? 'text' : this.props.type}`}
          name={this.props.name}
          id={this.props.name}
          value={this.props.value}
          className={`form-control ${this.hasValue() ? 'has-value' : ''}`}
          onChange={this.handleChange}
        />
        {this.props.eye && (
        <div
          className={`form-icon ${this.state.eyeIsActive ? 'is-active' : ''}`}
          onClick={this.eyeToggle}>
          <img src={EyeIcon.src} />
        </div>
        )}
        <label className="label" htmlFor={this.props.name}>
          {this.props.title}
        </label>
      </div>
    );
  };

  public handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e.target.name, e.target.value);
  };

  public hasValue = (): boolean => {
    if (this.state.value || this.props.value) return true;
    return false;
  };

  public eyeToggle = (): void => {
    this.setState({ eyeIsActive: !this.state.eyeIsActive });
  };
}

export default Input;
