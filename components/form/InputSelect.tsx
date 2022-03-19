import { Component } from 'react';

type InputProps = {
  name: string;
  title: string;
  options: Array<any>;
  defaultOption?: any;
  extraOption?: any;
  onChange: any;
};

type InputState = {
  value: any;
  isActive: boolean;
};

class InputSelect extends Component<InputProps, InputState> {
  constructor(props: any) {
    super(props);
  }

  public state: InputState = {
    value: this.props.defaultOption ? this.props.defaultOption : '',
    isActive: false,
  };

  public render() {
    return (
      <div className="form-group form-group--input-select">
        <div
          className={`form-group__select ${this.hasValue() ? 'has-value' : ''} ${this.state.isActive ? 'is-active' : ''}`}
          onClick={() => this.dropdownIsActive()}>
          <div className="form-group__select__content">
            {!this.props.defaultOption && (
              <div className="form-group__label">
                {this.props.title}
              </div>
            )}
            <div className="form-group__selected">
              {(typeof this.state.value == 'object' && typeof this.props.extraOption == 'object') && (
                <span>
                  {this.state.value.title[this.props.extraOption.url]}
                </span>
              )}

              {(typeof this.state.value == 'object' && !this.props.extraOption) && (
                <span>
                  {typeof this.state.value.title == 'string' ? this.state.value.title : ''}
                </span>
              )}
            </div>
          </div>
          <div className="form-group__icon"></div>
        </div>
        <div className={`form-group__options ${this.state.isActive ? 'is-active' : ''}`}>
          <ul className="form-group__list">
            {this.props.options.length > 0 && (
              this.props.options.map((option, index) => {
                return (
                  <li
                    className="form-group__item"
                    key={index}
                    onClick={() => this.handleChange(option)}>
                    {(typeof option.title == 'object' && this.props.extraOption) && (
                      <span>
                        {option.title[this.props.extraOption.url]}
                      </span>
                    )}

                    {!(typeof option.title == 'object') && (
                      <span>
                        {option.title}
                      </span>
                    )}
                  </li>
                )
              })
            )}
          </ul>
        </div>
      </div>
    );
  };

  public handleChange = (title: string | object): void => {
    this.setState({ value: title });
    this.setState({ isActive: !this.state.isActive });
    this.props.onChange(this.props.name, title);
  };

  public dropdownIsActive = (): void => {
    this.setState({ isActive: !this.state.isActive });
  };

  public hasValue = (): boolean => {
    if (this.state.value) return true;
    return false;
  };

  public componentDidUpdate(prevProps: Readonly<InputProps>): void {
    if (JSON.stringify(prevProps.options) !== JSON.stringify(this.props.options)) {
      this.setState({ value: '' });
      this.props.onChange(this.props.name, '');
    }
  }
}

export default InputSelect;
