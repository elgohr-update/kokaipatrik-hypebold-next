import { Component } from 'react';

type RadioProps = {
  name: string;
  isActive: boolean;
  option: any;
  onChange: any;
};

type RadioState = {
  value: any;
};

class Radio extends Component<RadioProps, RadioState> {
  public state: RadioState = {
    value: '',
  };

  public render() {
    return (
      <div
        className={`block block--radio ${this.props.isActive ? 'is-active' : ''}`}
        onClick={() => this.handleChange(this.props.option)}>
        <div className="block__name">
          {this.props.option.name}
        </div>
      </div>
    );
  };

  public handleChange = (title: string | object): void => {
    this.props.onChange(this.props.name, title);
  };
}

export default Radio;
