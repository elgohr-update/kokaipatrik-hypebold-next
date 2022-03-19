import { Component, ChangeEvent, createRef } from 'react';

interface RemoveItemData {
  group: string;
  id: string;
}

type SelectProps = {
  title: string;
  name: string;
  options: any;
  onChange: any;
  removeItem: RemoveItemData;
}

interface SelectedItem {
  id: string;
  name: string;
}

type SelectState = {
  isActive: boolean;
  selected: Array<SelectedItem>;
}

class Select extends Component<SelectProps, SelectState> {
  public state: SelectState = {
    isActive: false,
    selected: [],
  }

  private selectRef = createRef<HTMLDivElement>();

  public render() {
    return (
      <div
        ref={this.selectRef}
        className={`select select--filter ${this.state.isActive ? `is-active` : ``}`}>
        <div className="select__head" onClick={this.dropdownToggle}>
          <div className="select__title">{this.props.title}</div>
          <span className="select__count">{this.state.selected.length}</span>
          <span className="select__arrow"></span>
        </div>
        {this.props.options.length > 0 && (
          <ul
            className="select__list">
            {this.props.options.map((option: SelectedItem, index: number) => {
              return (
                <li
                  className={`select__item ${this.isSelectedById(option.id) ? 'is-selected' : ''}`}
                  data-item={option.id}
                  key={index}
                  onClick={this.selectItem}>
                  <span className="select__item__title">
                    {option.name}
                  </span>
                  <span className="select__item__pipe"></span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  };

  public dropdownToggle = (): void => {
    this.setState({ isActive: !this.state.isActive });
  }

  public selectItem = (e: ChangeEvent<HTMLLIElement>): void => {
    const id = e.target.dataset.item;
    const item = this.props.options.find(i => i.id === id);
    let selectedItems = this.state.selected;

    if (selectedItems.find(i => i.id === id)) {
      selectedItems = selectedItems.filter(item => item.id !== id);
    }
    else {
      selectedItems.push({
        id: id,
        name: item.name,
      });
    }

    this.setState({ selected: selectedItems });
    //this.setState({ isActive: false });
    this.props.onChange(this.props.name, selectedItems);
  }

  public isSelectedById = (id: string): boolean => {
    const selectedItems = this.state.selected;

    if (selectedItems.find(i => i.id === id)) return true;
    return false;
  }

  public selectClickOutside = (event: any): void => {
    if (this.selectRef && !this.selectRef.current.contains(event.target)) {
      this.setState({ isActive: false });
    }
  }

  componentDidMount = (): void => {
    document.addEventListener('mousedown', this.selectClickOutside);
  };

  componentWillUnmount = (): void => {
    document.removeEventListener('mousedown', this.selectClickOutside);
  }

  componentDidUpdate = (prevProps): void => {
    if (JSON.stringify(prevProps.removeItem) !== JSON.stringify(this.props.removeItem)) {
      if (this.props.removeItem.group === this.props.name) {
        let selectedItems = this.state.selected;

        if (selectedItems.find(i => i.id === this.props.removeItem.id)) {
          selectedItems = selectedItems.filter(item => item.id !== this.props.removeItem.id);
        }

        this.setState({ selected: selectedItems });
        this.props.onChange(this.props.removeItem.group, selectedItems);
      }
    }
  }
}

export default Select;
