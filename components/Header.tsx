import { Component, createRef } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';
import Router from 'next/router';

import Axios from '@/utils/axios';
import { actionCreators } from '@/store/base/index';
import { configActionCreators } from '@/store/config/index';
import { authActionCreators } from '@/store/auth/index';
import { Categories, Brands } from '@/types/types';
import { hasToken, logout } from '@/services/user.service';

import ExitIcon from '@/assets/svg/icons/exit.svg';
import SearchIcon from '@/assets/svg/icons/search.svg';
import UserIcon from '@/assets/svg/icons/user.svg';
import AvatarIcon from '@/assets/img/avatar.png';
import Search from '@/components/header/Search';
import Logo from '@/components/header/Logo';

type HeaderProps = {
  modal: any;
  modalToggle: any;
  backdrop: any;
  backdropToggle: any;
  config: any;
  setConfig: any;
  auth: any;
  setAuth: any;
};

type HeaderState = {
  categories: Array<Categories>;
  brands: Array<Brands>;
  mobileNavIsActive: boolean;
  searchIsActive: boolean;
  userIsActive: boolean;
  isScrolled: boolean;
  dropdownIsActive: boolean;
  profileDropdownIsActive: boolean;
  authMenuIsActive: boolean;
};

class Header extends Component<HeaderProps, HeaderState> {
  public state: HeaderState = {
    categories: [],
    brands: [],
    mobileNavIsActive: false,
    searchIsActive: false,
    userIsActive: false,
    isScrolled: false,
    dropdownIsActive: false,
    profileDropdownIsActive: false,
    authMenuIsActive: false,
  };

  private searchInput = createRef<HTMLInputElement>();
  private dropdownProfileRef = createRef<HTMLDivElement>();

  public render() {
    return (
      <header
        className={`header header--main ${this.state.searchIsActive || this.state.dropdownIsActive || this.state.authMenuIsActive ? 'search-is-active' : ''
          } ${this.state.isScrolled ? 'is-scrolled' : ''}`}
      >
        <div className="container">
          <div className="row">
            <div className="header__nav-left col-4 d-lg-none">
              <span
                className={`mobile-menu ${this.state.mobileNavIsActive ? 'is-active' : ''
                  }`}
                onClick={this.mobileNavToggle}
                aria-hidden="true"
              ></span>
            </div>
            <div className="header__logo col-4 col-lg-1">
              <Link href="/">
                <a>
                  <Logo />
                </a>
              </Link>
            </div>

            <div
              className={`header__nav col-lg-7 ${this.state.mobileNavIsActive ? 'is-active' : ''
                }
              ${this.state.searchIsActive ? 'is-hidden' : ''}
              `}
            >
              {this.state.categories.length > 0 && (
                <nav className="nav nav--header">
                  <ul className="nav__list">
                    <li
                      className="nav__item has-dropdown"
                      onMouseEnter={this.dropdownEnter}
                      onMouseLeave={this.dropdownLeave}>
                      <a className={`nav__link has-dropdown ${this.state.dropdownIsActive ? 'is-active' : ''}`}>
                        Brands
                      </a>

                      <ul className={`nav__dropdown__list ${this.state.dropdownIsActive ? 'is-active' : ''}`}>
                        {this.state.brands.map((brand, index) => {
                          return (
                            <li className="nav__dropdown__item" key={index}>
                              <Link href={`/brand/${brand.url}`}>
                                <a className="nav__link nav__dropdown__link">
                                  {brand.name}
                                </a>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>

                    <li
                      className="nav__item has-dropdown is-mobile"
                      onClick={this.dropdownClick}>
                      <a className={`nav__link has-dropdown ${this.state.dropdownIsActive ? 'is-active' : ''}`}>
                        Brands
                      </a>

                      <ul className={`nav__dropdown__list ${this.state.dropdownIsActive ? 'is-active' : ''}`}>
                        {this.state.brands.map((brand, index) => {
                          return (
                            <li className="nav__dropdown__item" key={index}>
                              <Link href={`/brand/${brand.url}`}>
                                <a className="nav__link nav__dropdown__link">
                                  {brand.name}
                                </a>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>

                    {this.state.categories.map((category, index) => {
                      return (
                        <li className="nav__item" key={index}>
                          <Link href={`/category/${category.url}`}>
                            <a className="nav__link">
                              {category.name}
                            </a>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              )}
            </div>
            <div
              className={`header__search col-lg-7 ${this.state.searchIsActive ? 'is-active' : ''
                }`}
            >
              <Search searchInput={this.searchInput} />
            </div>
            <div className="header__nav-right col-4 col-lg-4">
              <nav className="nav nav--icons">
                <ul className="nav__list">
                  <li
                    className={`nav__item nav__item--search ${this.state.searchIsActive ? 'is-active' : ''
                      }`}
                    onClick={this.searchToggle}
                    aria-hidden="true"
                  >
                    <img
                      src={SearchIcon.src}
                      className="nav__icon nav__icon--search"
                      alt="Search"
                      title="Search"
                    />
                    <img
                      src={ExitIcon.src}
                      className="nav__icon nav__icon--exit"
                      alt="Exit"
                      title="Exit"
                    />
                  </li>
                  <li
                    className={`nav__item nav__item--user ${this.props.auth?.token ? 'd-lg-none' : ''} ${this.state.authMenuIsActive ? 'is-active' : ''}`}
                    onClick={this.openAuth}
                    aria-hidden="true"
                  >
                    <img
                      src={UserIcon.src}
                      className="nav__icon nav__icon--user"
                      alt="User"
                      title="User" />
                    <img
                      src={ExitIcon.src}
                      className="nav__icon nav__icon--exit"
                      alt="Exit"
                      title="Exit" />
                    <span className="nav__title">Login</span>
                  </li>
                  <div className="nav__item d-none d-lg-block">
                    <button
                      className="btn btn-primary"
                      onClick={this.openNewAd}
                    >
                      New ad
                    </button>
                  </div>
                  {this.props.auth?.token && (
                    <div className="nav__item d-none d-lg-block" ref={this.dropdownProfileRef}>
                      <div className="block block--top-profile">
                        <div className="block__content" onClick={this.openProfileDropdown}>
                          <span className="block__name">{this.props.auth?.data?.username?.split(' ')[0]}</span>
                          <figure className="block__figure">
                            <img src={AvatarIcon.src} alt="" title="" className="block__img" />
                          </figure>
                        </div>
                        <div
                          className={`block__dropdown ${this.state.profileDropdownIsActive ? 'is-active' : ''}`}>
                          {this.authNavItems.length && (
                            <ul className="block__dropdown__list">
                              {this.authNavItems.map((item, index) => {
                                return (
                                  <li className="block__dropdown__item" key={index}>
                                    <Link href={item.url}>
                                      <a className="block__dropdown__link">
                                        {item.name}
                                      </a>
                                    </Link>
                                  </li>
                                )
                              })}
                              <li
                                className="block__dropdown__item"
                                onClick={() => logout()}>
                                Logout
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className={`block block--auth-menu ${this.props.auth?.token && this.state.authMenuIsActive ? 'is-active' : ''}`}>
          <div className="block__head" onClick={this.openProfileDropdown}>
            <figure className="block__figure">
              <img src={AvatarIcon.src} alt="" title="" className="block__img" />
            </figure>
            <span className="block__name">{this.props.auth?.data?.username?.split(' ')[0]}</span>
          </div>
          <ul className="block__dropdown__list">
            {this.authNavItems.map((item, index) => {
              return (
                <li className="block__dropdown__item" key={index}>
                  <Link href={item.url}>
                    <a className="block__dropdown__link">
                      {item.name}
                    </a>
                  </Link>
                </li>
              )
            })}
            <li
              className="block__dropdown__item"
              onClick={() => logout()}>
              Logout
            </li>
          </ul>
        </div>
      </header>
    )
  };

  public authNavItems = [
    {
      url: "/profile",
      name: "Profile",
    },
    {
      url: "/my-ads",
      name: "My ads",
    },
    {
      url: "/my-favorites",
      name: "My favorites",
    },
    {
      url: "/settings",
      name: "Settings",
    },
  ];

  public async fetchData() {
    try {
      const config = await Axios.get('/config');

      this.props.setConfig({
        data: config.data?.data,
      });

      this.setState({ categories: this.props.config.data.categories });
      this.setState({ brands: this.props.config.data.brands });
    } catch (e) {
      console.log('server sucks', e);
    }
  };

  public async fetchAuth() {
    try {
      const auth = hasToken()
        ? await Axios.get('/auth/me', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        : '';

      if (auth) {
        this.props.setAuth({
          token: localStorage.getItem('token'),
          data: auth.data,
        });
      }
    } catch (e) {
      localStorage.removeItem('token');
    }
  };

  public mobileNavToggle = (): void => {
    this.props.backdropToggle(false);

    this.setState({ mobileNavIsActive: !this.state.mobileNavIsActive });
    this.setState({ searchIsActive: false });

    this.props.modalToggle({
      name: this.props.modal.name,
      toggle: false,
    });
  };

  public searchToggle = (): void => {
    this.setState({ searchIsActive: !this.state.searchIsActive });
    this.setState({ mobileNavIsActive: false });

    this.props.modalToggle({
      name: this.props.modal.name,
      toggle: false,
    });

    if (this.state.searchIsActive) this.props.backdropToggle(false);
    else this.props.backdropToggle(true);
  };

  public openAuth = (): void => {
    if (!this.props.auth?.token) {
      this.props.modalToggle({ name: 'auth', toggle: !this.props.modal.toggle });

      if (this.props.modal.toggle) this.props.backdropToggle(false);
      else this.props.backdropToggle(true);
    }
    else {
      this.setState({ authMenuIsActive: !this.state.authMenuIsActive });

      if (this.state.authMenuIsActive) this.props.backdropToggle(false);
      else this.props.backdropToggle(true);
    }

    this.setState({ searchIsActive: false });
    this.setState({ mobileNavIsActive: false });
  };

  public openNewAd = (): void => {
    if (!this.props.auth?.token) {
      if (!this.props.backdrop) this.props.backdropToggle(!this.props.backdrop);
      this.props.modalToggle({
        name: 'new-ad',
        toggle: !this.props.modal.toggle,
      });

      this.setState({ searchIsActive: false });
      this.setState({ mobileNavIsActive: false });
    }
    else {
      Router.push('/new-ad');
    }
  };

  public isScrolled = (): void => {
    if (window.pageYOffset > 1) this.setState({ isScrolled: true });
    else this.setState({ isScrolled: false });
  };

  public dropdownEnter = (): void => {
    this.setState({ dropdownIsActive: true });
  };

  public dropdownLeave = (): void => {
    this.setState({ dropdownIsActive: false });
  };

  public dropdownClick = (): void => {
    this.setState({ dropdownIsActive: !this.state.dropdownIsActive });
  };

  public openProfileDropdown = (): void => {
    this.setState({ profileDropdownIsActive: !this.state.profileDropdownIsActive });
  }

  public profileDropdownClickOutside = (event: any): void => {
    if (this.props.auth.token) {
      if (this.dropdownProfileRef && !this.dropdownProfileRef?.current?.contains(event.target)) {
        this.setState({ profileDropdownIsActive: false });
      }
    }
  }

  componentDidUpdate = (): void => {
    if (!this.props.backdrop) {
      if (this.state.searchIsActive) {
        this.setState({ searchIsActive: !this.state.searchIsActive });
      }

      if (this.state.authMenuIsActive) {
        this.setState({ authMenuIsActive: !this.state.authMenuIsActive });
      }

      if (this.props.modal.toggle) {
        this.props.modalToggle({
          name: this.props.modal.name,
          toggle: !this.props.modal.toggle,
        });
      }
    }
  };

  componentDidMount = (): void => {
    window.addEventListener('scroll', this.isScrolled);
    document.addEventListener('mousedown', this.profileDropdownClickOutside);
    this.fetchData();
    this.fetchAuth();
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.isScrolled);
    document.addEventListener('mousedown', this.profileDropdownClickOutside);
  }
};

const mapStateToProps = (state: any) => {
  return {
    modal: state.modal,
    backdrop: state.backdrop,
    config: state.config,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(actionCreators, dispatch),
  ...bindActionCreators(configActionCreators, dispatch),
  ...bindActionCreators(authActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
