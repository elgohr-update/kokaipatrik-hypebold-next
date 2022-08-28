import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { actionCreators } from '@/store/base/index';

import Exit from '@/assets/svg/icons/exit-modal.svg';

type ModalProps = {
  name: string;
  content: any;
};

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const dispatch = useDispatch();

  const modal = useSelector(state => state.modal);

  const isActive = (): boolean => {
    if (
      modal.name == props.name &&
      modal.toggle == true
    )
      return true;
    return false;
  };

  const exit = (): void => {
    dispatch(actionCreators.modalToggle(
      {
        name: modal.name,
        toggle: false,
      }
    ));

    dispatch(actionCreators.backdropToggle(false));
  };

  return (
    <div
      className={`block block--modal block--modal-${props.name} ${isActive() ? 'is-active' : ''
        }`}
    >
      <div className="block__head">
        <div
          className="block__exit"
          onClick={exit}
          aria-hidden="true"
        >
          <img
            src={Exit.src}
            alt=""
          />
        </div>
      </div>
      {props.content}
    </div>
  );
};

export default Modal;
