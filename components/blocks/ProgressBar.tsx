import React from 'react';

interface ProgressBarItems {
  name: string;
  title: string;
}

type ProgressBarProps = {
  items: Array<ProgressBarItems>;
  active: number;
  onClick: any;
}

const ProgressBar: React.FC<ProgressBarProps> = (props: ProgressBarProps) => {
  const changeStep = (index: number) => props.onClick(index);

  return (
    <div className="block block--progressbar">
      {props.items.length > 0 && (
        <ul className="block__list">
          {props.items.map((item, index) => {
            return (
              <li
                className={`block__item ${props.active === index ? 'is-active' : ''}`}
                key={index}
                onClick={() => changeStep(index)}>
                <span className="block__item__count">
                  {index + 1}
                </span>
                <span className="block__item__title">
                  {item.title}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
}

export default ProgressBar;
