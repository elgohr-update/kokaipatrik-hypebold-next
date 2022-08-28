import React, { useState } from 'react';

type RadioProps = {
  name: string;
  isActive: boolean;
  option: any;
  onChange: any;
};

const Radio: React.FC<RadioProps> = (props: RadioProps) => {
  const [value, setValue] = useState<any>('');

  const handleChange = (title: string | object): void => {
    props.onChange(props.name, title);
  };

  return (
    <div
      className={`block block--radio ${props.isActive ? 'is-active' : ''}`}
      onClick={() => handleChange(props.option)}>
      <div className="block__name">
        {props.option.name}
      </div>
    </div>
  );
}

export default Radio;
