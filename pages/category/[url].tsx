import Head from 'next/head';

import Layout, { siteTitle } from '@/components/Layout';
import Category from '@/components/Category';
import { getCategoryQueriesByUrl, getCategoryDataByUrl } from '@/pages/api/categories';
import { Categories } from '@/types/types';

type CategoryProps = {
  queries: Array<Categories>;
  category: Categories;
};

const CategoryPage = (props: CategoryProps) => {
  return (
    <Layout>
      <Head>
        <title>{props.category?.name ? props.category.name : null} – {siteTitle}</title>
      </Head>
      <Category
        title={props.category?.name ? props.category.name : null}
        data={props.queries}
        categoryId={props.category?._id}
      />
    </Layout>
  )
}

export default CategoryPage;

export async function getServerSideProps({ params }) {
  const queries = await getCategoryQueriesByUrl(params.url);
  const category = await getCategoryDataByUrl(params.url);

  return {
    props: {
      queries: queries ? queries : null,
      category: category ? category : null,
    }
  }
}
