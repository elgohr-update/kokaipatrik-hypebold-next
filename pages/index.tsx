import Head from 'next/head'

import Layout, { siteTitle } from '@/components/Layout';

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h2>Welcome</h2>
        <ul>
        </ul>
      </section>
    </Layout>
  )
}

export default Home;
