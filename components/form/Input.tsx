import React, { ChangeEvent, useState } from 'react';

import EyeIcon from '@/assets/svg/icons/eye.svg';

type InputProps = {
  type: string;
  name: string;
  title: string;
  onChange: any;
  value?: any;
  eye?: boolean;
};

const Input: React.FC<InputProps> = (props: InputProps) => {
  const [value, setValue] = useState<string>('');
  const [eyeIsActive, setEyeIsActive] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange(e.target.name, e.target.value);
  };

  const hasValue = (): boolean => {
    if (value || props.value) return true;
    return false;
  };

  const eyeToggle = (): void => setEyeIsActive(!eyeIsActive);

  return (
    <div className="form-group">
      <input
        type={`${!eyeIsActive ? 'text' : props.type}`}
        name={props.name}
        id={props.name}
        value={props.value}
        className={`form-control ${hasValue() ? 'has-value' : ''}`}
        onChange={handleChange}
      />
      {props.eye && (
        <div
          className={`form-icon ${eyeIsActive ? 'is-active' : ''}`}
          onClick={eyeToggle}>
          <img src={EyeIcon.src} />
        </div>
      )}
      <label className="label" htmlFor={props.name}>
        {props.title}
      </label>
    </div>
  );
}

export default Input;
