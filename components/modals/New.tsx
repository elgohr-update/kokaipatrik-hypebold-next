import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';

import { authActionCreators } from '@/store/auth/index';
import Modal from '@/components/Modal';

type NewProps = {
  auth: any;
};

class NewAd extends Component<NewProps> {
  public render() {
    if (this.props.auth?.token) return null;
    return (
      <Modal
        name="new-ad"
        content={
          <div className="container block__container">
            <div className="block__content">
              <div className="block__title">New ad</div>
              <p className="block__description">
                Please sign in to upload new ad.
              </p>
            </div>
          </div>
        }
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(authActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAd);
