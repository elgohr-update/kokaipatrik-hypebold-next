import { useSelector, useDispatch } from 'react-redux';

import { actionCreators } from '@/store/base/index';

const Backdrop: React.FC = () => {
  const dispatch = useDispatch();
  const backdrop = useSelector(state => state.backdrop);

  const disableBackdrop = (): void => {
    if (backdrop) {
      dispatch(actionCreators.backdropToggle(!backdrop));
      localStorage.setItem('ignore', 'true');
    }
  };

  return (
    <div
      className={`elem elem--backdrop ${backdrop ? 'is-active' : ''
        }`}
      onClick={disableBackdrop}
      aria-hidden="true"
    ></div>
  );
}

export default Backdrop;
