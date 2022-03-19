import Header from '@/components/Header';
import Auth from '@/components/modals/Auth';
import NewAd from '@/components/modals/New';
import Backdrop from '@/components/Backdrop';
import NProgress from 'nprogress';
import Router from 'next/router';
import { Provider } from 'react-redux';

import '@/scss/_app.scss';
import { store } from '@/store/store';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Auth />
      <NewAd />
      <Backdrop />
    </Provider>
  )
}
