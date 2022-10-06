import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
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

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const modal = useSelector(state => state.modal);
  const backdrop = useSelector(state => state.backdrop);
  const config = useSelector(state => state.config);
  const auth = useSelector(state => state.auth);

  const [categories, setCategories] = useState<Array<Categories>>([]);
  const [brands, setBrands] = useState<Array<Brands>>([]);
  const [mobileNavIsActive, setMobileNavIsActive] = useState<Boolean>(false);
  const [searchIsActive, setSearchIsActive] = useState<Boolean>(false);
  const [userIsActive, setUserIsActive] = useState<Boolean>(false);
  const [isScrolled, setIsScrolled] = useState<Boolean>(false);
  const [dropdownIsActive, setDropdownIsActive] = useState<Boolean>(false);
  const [profileDropdownIsActive, setProfileDropdownIsActive] = useState<Boolean>(false);
  const [authMenuIsActive, setAuthMenuIsActive] = useState<Boolean>(false);

  const searchInput = useRef<HTMLInputElement>();
  const dropdownProfileRef = useRef<HTMLDivElement>();

  const authNavItems = [
    {
      url: '/profile',
      name: 'Profile',
    },
    {
      url: '/my-ads',
      name: 'My ads',
    },
    {
      url: '/my-favorites',
      name: 'My favorites',
    },
    {
      url: '/settings',
      name: 'Settings',
    },
  ];

  const mobileNavToggle = (): void => {
    dispatch(actionCreators.backdropToggle(false));

    setMobileNavIsActive(!mobileNavIsActive);
    setSearchIsActive(false);

    dispatch(actionCreators.modalToggle(
      {
        name: modal.name,
        toggle: false,
      }
    ));
  };

  const searchToggle = (): void => {
    setSearchIsActive(!searchIsActive);
    setMobileNavIsActive(false);

    dispatch(actionCreators.modalToggle(
      {
        name: modal.name,
        toggle: false,
      }
    ));

    if (searchIsActive) dispatch(actionCreators.backdropToggle(false));
    else dispatch(actionCreators.backdropToggle(true));
  };

  const openAuth = (): void => {
    if (!auth?.token) {
      dispatch(actionCreators.modalToggle(
        {
          name: 'auth',
          toggle: !modal.toggle
        }
      ));

      if (modal.toggle) dispatch(actionCreators.backdropToggle(false));
      else dispatch(actionCreators.backdropToggle(true));
    }
    else {
      setAuthMenuIsActive(true);

      if (authMenuIsActive) dispatch(actionCreators.backdropToggle(false));
      else dispatch(actionCreators.backdropToggle(true));
    }

    setSearchIsActive(false);
    setMobileNavIsActive(false);
  };

  const openNewAd = (): void => {
    if (!auth?.token) {
      if (!backdrop) dispatch(actionCreators.backdropToggle(!backdrop));

      dispatch(actionCreators.modalToggle(
        {
          name: 'new-ad',
          toggle: !modal.toggle,
        }
      ));

      setSearchIsActive(false);
      setMobileNavIsActive(false);
    }
    else {
      Router.push('/new-ad');
    }
  };

  const isScrolledFn = (): void => {
    if (window.pageYOffset > 1) setIsScrolled(true);
    else setIsScrolled(false);
  };

  const dropdownEnter = (): void => setDropdownIsActive(true);
  const dropdownLeave = (): void => setDropdownIsActive(false);
  const dropdownClick = (): void => setDropdownIsActive(!dropdownIsActive);
  const openProfileDropdown = (): void => setProfileDropdownIsActive(!profileDropdownIsActive);
  const profileDropdownClickOutside = (event: any): void => {
    if (auth.token) {
      if (dropdownProfileRef && !dropdownProfileRef?.current?.contains(event.target)) {
        setProfileDropdownIsActive(false);
      }
    }
  };

  const fetchData = async () => {
    try {
      const configData = await Axios.get('/config');

      dispatch(configActionCreators.setConfig(
        {
          data: configData.data?.data,
        }
      ));

      setCategories(configData.data.data.categories);
      setBrands(configData.data.data.brands);
    } catch (error) {
      throw new Error(`Server sucks ${error}`);
    }
  };

  const fetchAuth = async () => {
    try {
      const auth = hasToken()
        ? await Axios.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        : '';

      if (auth) {
        dispatch(authActionCreators.setAuth(
          {
            token: localStorage.getItem('token'),
            data: auth.data,
          }
        ));
      }
    } catch (e) {
      localStorage.removeItem('token');
    }
  };

  const getMonogram = (username: string) => {
    if (username) {
      const name = username.split(' ');

      if (name.length > 1) {
        return (name[0].charAt(0) + name[1].charAt(0)).toUpperCase();
      } else {
        return username.slice(0, 2).toUpperCase();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', isScrolledFn);
    document.addEventListener('mousedown', profileDropdownClickOutside);
    fetchData();
    fetchAuth();

    return () => {
      window.removeEventListener('scroll', isScrolledFn);
      document.addEventListener('mousedown', profileDropdownClickOutside);
    }
  }, []);

  useEffect(() => {
    if (!backdrop) {
      if (searchIsActive) setSearchIsActive(!searchIsActive);
      if (authMenuIsActive) setAuthMenuIsActive(!authMenuIsActive);

      if (modal.toggle) {
        dispatch(actionCreators.modalToggle(
          {
            name: modal.name,
            toggle: !modal.toggle,
          }
        ));
      }
    }
  });

  return (
    <header
      className={`header header--main ${searchIsActive || dropdownIsActive || authMenuIsActive ? 'search-is-active' : ''
        } ${isScrolled ? 'is-scrolled' : ''}`}
    >
      <div className="container">
        <div className="row">
          <div className="header__nav-left col-4 d-lg-none">
            <span
              className={`mobile-menu ${mobileNavIsActive ? 'is-active' : ''
                }`}
              onClick={mobileNavToggle}
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
            className={`header__nav col-lg-7 ${mobileNavIsActive ? 'is-active' : ''
              }
              ${searchIsActive ? 'is-hidden' : ''}
              `}
          >
            {categories && categories.length > 0 && (
              <nav className="nav nav--header">
                <ul className="nav__list">
                  {brands && brands.length > 0 && (
                    <>
                      <li
                        className="nav__item has-dropdown"
                        onMouseEnter={dropdownEnter}
                        onMouseLeave={dropdownLeave}
                      >
                        <a className={`nav__link has-dropdown ${dropdownIsActive ? 'is-active' : ''}`}>
                          Brands
                        </a>

                        <ul className={`nav__dropdown__list ${dropdownIsActive ? 'is-active' : ''}`}>
                          {brands.map((brand, index) => {
                            return (
                              <li
                                className="nav__dropdown__item"
                                key={index}
                              >
                                <Link href={`/brand/${brand.url}`}>
                                  <a className="nav__link nav__dropdown__link">
                                    {brand.name}
                                  </a>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>

                      <li
                        className="nav__item has-dropdown is-mobile"
                        onClick={dropdownClick}
                      >
                        <a className={`nav__link has-dropdown ${dropdownIsActive ? 'is-active' : ''}`}>
                          Brands
                        </a>

                        <ul className={`nav__dropdown__list ${dropdownIsActive ? 'is-active' : ''}`}>
                          {brands.map((brand, index) => {
                            return (
                              <li
                                className="nav__dropdown__item"
                                key={index}
                              >
                                <Link href={`/brand/${brand.url}`}>
                                  <a className="nav__link nav__dropdown__link">
                                    {brand.name}
                                  </a>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    </>
                  )}

                  {categories.map((category, index) => {
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
            className={`header__search col-lg-7 ${searchIsActive ? 'is-active' : ''
              }`}
          >
            <Search searchInput={searchInput} />
          </div>
          <div className="header__nav-right col-4 col-lg-4">
            <nav className="nav nav--icons">
              <ul className="nav__list">
                <li
                  className={`nav__item nav__item--search ${searchIsActive ? 'is-active' : ''
                    }`}
                  onClick={searchToggle}
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
                  className={`nav__item nav__item--user ${auth?.token ? 'd-lg-none' : ''} ${authMenuIsActive ? 'is-active' : ''}`}
                  onClick={openAuth}
                  aria-hidden="true"
                >
                  <img
                    src={UserIcon.src}
                    className="nav__icon nav__icon--user"
                    alt="User"
                    title="User"
                  />
                  <img
                    src={ExitIcon.src}
                    className="nav__icon nav__icon--exit"
                    alt="Exit"
                    title="Exit"
                  />
                  <span className="nav__title">Login</span>
                </li>
                <div className="nav__item d-none d-lg-block">
                  <button
                    className="btn btn-primary"
                    onClick={openNewAd}
                  >
                    New ad
                  </button>
                </div>
                {auth?.token && (
                  <div
                    className="nav__item d-none d-lg-block"
                    ref={dropdownProfileRef}
                  >
                    <div className="block block--top-profile">
                      <div
                        className="block__content"
                        onClick={openProfileDropdown}
                      >
                        <span className="block__name">
                          {getMonogram(auth?.data?.username)}
                        </span>
                        <figure className="block__figure">
                          <img
                            src={AvatarIcon.src}
                            alt=""
                            title=""
                            className="block__img"
                          />
                        </figure>
                      </div>
                      <div
                        className={`block__dropdown ${profileDropdownIsActive ? 'is-active' : ''}`}>
                        {authNavItems.length && (
                          <ul className="block__dropdown-list">
                            {authNavItems.map((item, index) => {
                              return (
                                <li
                                  className="block__dropdown-item"
                                  key={index}
                                >
                                  <Link href={item.url}>
                                    <a className="block__dropdown-link">
                                      {item.name}
                                    </a>
                                  </Link>
                                </li>
                              )
                            })}
                            <li
                              className="block__dropdown-item"
                              onClick={() => logout()}
                            >
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
      <div className={`block block--auth-menu ${auth?.token && authMenuIsActive ? 'is-active' : ''}`}>
        <div
          className="block__head"
          onClick={openProfileDropdown}
        >
          <figure className="block__figure">
            <img
              src={AvatarIcon.src}
              alt=""
              title=""
              className="block__img"
            />
          </figure>
          <span className="block__name">
            {getMonogram(auth?.data?.username)}
          </span>
        </div>
        <ul className="block__dropdown-list">
          {authNavItems.map((item, index) => {
            return (
              <li
                className="block__dropdown-item"
                key={index}
              >
                <Link href={item.url}>
                  <a className="block__dropdown-link">
                    {item.name}
                  </a>
                </Link>
              </li>
            )
          })}
          <li
            className="block__dropdown-item"
            onClick={() => logout()}
          >
            Logout
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
