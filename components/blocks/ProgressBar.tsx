import { Component } from 'react';

interface ProgressBarItems {
  name: string;
  title: string;
}

type ProgressBarProps = {
  items: Array<ProgressBarItems>;
  active: number;
  onClick: any;
}

class ProgressBar extends Component<ProgressBarProps> {
  public render() {
    return (
      <div className="block block--progressbar">
        {this.props.items.length > 0 && (
          <ul className="block__list">
            {this.props.items.map((item, index) => {
              return (
                <li
                  className={`block__item ${this.props.active === index ? 'is-active' : ''}`}
                  key={index}
                  onClick={() => this.changeStep(index)}>
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
  };

  public changeStep = (index: number) => {
    this.props.onClick(index);
  };
}

export default ProgressBar;
