import { Component } from 'react';
import Head from 'next/head'

import Layout, { siteTitle } from '@/components/Layout';

class Home extends Component {
  public render() {
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
}

export default Home;
