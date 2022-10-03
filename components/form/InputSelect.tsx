import React, { useState, useRef, useEffect } from 'react';

type InputProps = {
  name: string;
  title: string;
  options: Array<any>;
  defaultOption?: any;
  extraOption?: any;
  onChange: any;
};

const InputSelect: React.FC<InputProps> = (props: InputProps) => {
  const [value, setValue] = useState<any>(props.defaultOption ? props.defaultOption : '');
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleChange = (title: string | object): void => {
    setValue(title);
    setIsActive(!isActive);

    props.onChange(props.name, title);
  };

  const dropdownIsActive = (): void => setIsActive(!isActive);

  const hasValue = (): boolean => {
    if (value) return true;
    return false;
  };

  const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    });

    return ref.current;
  }

  const { options } = props;
  const prevOptions = usePrevious({options}) as any;

  useEffect(() => {
    if (JSON.stringify(prevOptions?.options) !== JSON.stringify(options)) {
      setValue('');
      props.onChange(props.name, '');
    }
  }, [options]);

  return (
    <div className="form-group form-group--input-select">
      <div
        className={`form-group__select ${hasValue() ? 'has-value' : ''} ${isActive ? 'is-active' : ''}`}
        onClick={() => dropdownIsActive()}>
        <div className="form-group__select__content">
          {!props.defaultOption && (
            <div className="form-group__label">
              {props.title}
            </div>
          )}
          <div className="form-group__selected">
            {(typeof value == 'object' && typeof props.extraOption == 'object') && (
              <span>
                {value.title[props.extraOption.url]}
              </span>
            )}

            {(typeof value == 'object' && !props.extraOption) && (
              <span>
                {typeof value.title == 'string' ? value.title : ''}
              </span>
            )}
          </div>
        </div>
        <div className="form-group__icon"></div>
      </div>
      <div className={`form-group__options ${isActive ? 'is-active' : ''}`}>
        <ul className="form-group__list">
          {props.options.length > 0 && (
            props.options.map((option, index) => {
              return (
                <li
                  className="form-group__item"
                  key={index}
                  onClick={() => handleChange(option)}>
                  {(typeof option.title == 'object' && props.extraOption) && (
                    <span>
                      {option.title[props.extraOption.url]}
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
}

export default InputSelect;
