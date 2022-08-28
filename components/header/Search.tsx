import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import SearchIcon from '@/assets/svg/icons/search.svg';

type SearchProps = {
  searchInput: any;
  auth: any;
};

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    const input = props.searchInput.current;
    if (input) input.focus();
  });

  return (
    <div className="container">
      <div className="row">
        <div className={`block block--search ${auth?.token ? 'is-user' : ''}`}>
          <div className="block__search">
            <input
              type="text"
              className="block__input form-control"
              placeholder="Search"
              ref={props.searchInput}
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
};

export default Search;
