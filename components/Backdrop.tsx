import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';

import { actionCreators } from '@/store/base/index';

type BackdropProps = {
  backdrop: any;
  backdropToggle: any;
};

class Backdrop extends Component<BackdropProps> {
  public render() {
    return (
      <div
        className={`elem elem--backdrop ${
          this.props.backdrop ? 'is-active' : ''
        }`}
        onClick={this.disableBackdrop}
        aria-hidden="true"
      ></div>
    );
  }

  public disableBackdrop = (): void => {
    if (this.props.backdrop) this.props.backdropToggle(!this.props.backdrop);
  };
}

const mapStateToProps = (state: any) => {
  return {
    backdrop: state.backdrop,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);
