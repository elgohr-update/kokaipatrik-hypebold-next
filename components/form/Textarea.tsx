import { ChangeEvent, Component } from 'react';

type TextareaProps = {
  name: string;
  title: string;
  onChange: any;
};

type TextareaState = {
  value: string;
};

class Textarea extends Component<TextareaProps, TextareaState> {
  constructor(props: any) {
    super(props);
  }

  public state: TextareaState = {
    value: '',
  };

  public render() {
    return (
      <div className="form-group">
        <textarea
          name={this.props.name}
          id={this.props.name}
          value={this.state.value}
          rows={5}
          className={`form-control ${this.hasValue() ? 'has-value' : ''}`}
          onChange={this.handleChange}
        />
        <label className="label label-textarea" htmlFor={this.props.name}>
          {this.props.title}
        </label>
      </div>
    );
  };

  public handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e.target.name, e.target.value);
  };

  public hasValue = (): boolean => {
    if (this.state.value) return true;
    return false;
  };
}

export default Textarea;
