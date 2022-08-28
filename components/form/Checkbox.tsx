import React, { ChangeEvent, useState } from 'react';

type CheckboxProps = {
  name: string;
  title: string;
  onChange: any;
};

const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  const [checkboxState, setCheckboxState] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckboxState(!checkboxState);

    props.onChange(e.target.name, !checkboxState);
  };

  return (
    <div className="form-group">
      <label className="form-checkbox-container">
        {props.title}
        <input
          type="checkbox"
          className="form-checkbox-input"
          name={props.name}
          onChange={handleChange}
        />
        <span className="form-checkbox-mark"></span>
      </label>
    </div>
  );
}

export default Checkbox;
