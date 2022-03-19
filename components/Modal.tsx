import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';

import { actionCreators } from '@/store/base/index';
import { Modal as ModalType } from '@/store/base/action-types/index';

import Exit from '@/assets/svg/icons/exit-modal.svg';

type ModalProps = {
  name: string;
  content: any;
  modal: ModalType;
  modalToggle: any;
  backdropToggle: any;
};

class Modal extends Component<ModalProps> {
  public render() {
    return (
      <div
        className={`block block--modal block--modal-${this.props.name} ${
          this.isActive() ? 'is-active' : ''
        }`}
      >
        <div className="block__head">
          <div
            className="block__exit"
            onClick={this.exit}
            aria-hidden="true"
          >
            <img src={Exit.src} alt="" />
          </div>
        </div>
        {this.props.content}
      </div>
    );
  }

  public isActive = (): boolean => {
    if (
      this.props.modal.name == this.props.name &&
      this.props.modal.toggle == true
    )
      return true;
    return false;
  };

  public exit = (): void => {
    this.props.modalToggle({ name: this.props.modal.name, toggle: false });
    this.props.backdropToggle(false);
  };
}

const mapStateToProps = (state: any) => {
  return {
    modal: state.modal,
    backdrop: state.backdrop,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
