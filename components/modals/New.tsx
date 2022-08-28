import { useSelector } from 'react-redux';

import Modal from '@/components/Modal';

const New: React.FC = () => {
  const authManagement = useSelector(state => state.auth);

  if (authManagement?.token) return null;
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

export default New;
