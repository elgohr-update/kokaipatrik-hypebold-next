import { ChangeEvent, useState } from 'react';

type TextareaProps = {
  name: string;
  title: string;
  value?: any;
  onChange: any;
};

const Textarea: React.FC<TextareaProps> = (props: TextareaProps) => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    props.onChange(e.target.name, e.target.value);
  };

  const hasValue = (): boolean => {
    if (props.value) return true;
    return false;
  };

  return (
    <div className="form-group">
      <textarea
        name={props.name}
        id={props.name}
        value={props.value}
        rows={5}
        className={`form-control ${hasValue() ? 'has-value' : ''}`}
        onChange={handleChange}
      />
      <label className="label label-textarea" htmlFor={props.name}>
        {props.title}
      </label>
    </div>
  );
}

export default Textarea;
