import 'react-redux';

import { AppState } from '@/store/reducers';

declare module 'react-redux' {
  interface DefaultRootState extends AppState { }
}
