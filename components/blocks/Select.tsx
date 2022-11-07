import React, { MouseEvent, useEffect, useState, useRef } from 'react';

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
  clearItems: boolean;
}

interface SelectedItem {
  id: string;
  name: string;
}

const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<Array<SelectedItem>>([]);

  const selectRef = useRef<HTMLDivElement>();

  const dropdownToggle = (): void => setIsActive(!isActive);

  const selectItem = (e: MouseEvent<HTMLLIElement>): void => {
    const id = e.currentTarget.getAttribute('data-item');
    const item = props.options.find(i => i.id === id);
    let selectedItems = selected;

    if (selectedItems.find(i => i.id === id)) {
      selectedItems = selectedItems.filter(item => item.id !== id);
    }
    else {
      selectedItems.push({
        id: id,
        name: item.name,
      });
    }

    setSelected(selectedItems);
    props.onChange(props.name, selectedItems);
  };

  const isSelectedById = (id: string): boolean => {
    const selectedItems = selected;

    if (selectedItems.find(i => i.id === id)) return true;
    return false;
  };

  const selectClickOutside = (event: any): void => {
    if (selectRef && !selectRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', selectClickOutside);

    return () => {
      document.removeEventListener('mousedown', selectClickOutside);
    }
  }, []);

  const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    });

    return ref.current;
  };

  const { removeItem } = props;
  const prevRemoveItem = usePrevious({removeItem});

  useEffect(() => {
    if (JSON.stringify(prevRemoveItem) !== JSON.stringify(removeItem)) {
      if (removeItem.group === props.name) {
        let selectedItems = selected;

        if (selectedItems.find(i => i.id === removeItem.id)) {
          selectedItems = selectedItems.filter(item => item.id !== removeItem.id);
        }

        setSelected(selectedItems);
        props.onChange(removeItem.group, selectedItems);
      }
    }
  }, [removeItem]);

  useEffect(() => {
    if (props.clearItems === true) setSelected([]);
  }, [props.clearItems]);

  return (
    <div
      ref={selectRef}
      className={`select select--filter ${isActive ? `is-active` : ``}`}>
      <div className="select__head" onClick={dropdownToggle}>
        <div className="select__title">{props.title}</div>
        <span className="select__count">{selected.length}</span>
        <span className="select__arrow"></span>
      </div>
      {props.options.length > 0 && (
        <ul
          className="select__list">
          {props.options.map((option: SelectedItem, index: number) => {
            return (
              <li
                className={`select__item ${isSelectedById(option.id) ? 'is-selected' : ''}`}
                data-item={option.id}
                key={index}
                onClick={e => selectItem(e)}
              >
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
  );
}

export default Select;
