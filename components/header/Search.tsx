import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';

import { authActionCreators } from '@/store/auth/index';
import SearchIcon from '@/assets/svg/icons/search.svg';

type SearchProps = {
  searchInput: any;
  auth: any;
};

class Search extends Component<SearchProps> {
  public render() {
    return (
      <div className="container">
        <div className="row">
          <div className={`block block--search ${this.props.auth?.token ? 'is-user' : ''}`}>
            <div className="block__search">
              <input
                type="text"
                className="block__input form-control"
                placeholder="Search"
                ref={this.props.searchInput}
              />
              <button className="block__btn">
                <img src={SearchIcon.src} alt="Search" title="Search" />
              </button>
            </div>
            <div className="block__related">
              <div className="block__title">Popular keywords</div>

              <ul className="block__list">
                <li>Pine Green</li>
                <li>Yeezy</li>
                <li>Jordan 1</li>
                <li>Adidas</li>
                <li>Nike</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    const input = this.props.searchInput.current;
    console.log('search input update', input);
    if (input) input.focus();
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
)(Search);
