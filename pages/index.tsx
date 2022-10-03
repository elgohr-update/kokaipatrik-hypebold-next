import Head from 'next/head'

import { siteTitle } from '@/components/Layout';

const Home = () => {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h2>Welcome</h2>
        <ul>
        </ul>
      </section>
    </>
  )
}

export default Home;
