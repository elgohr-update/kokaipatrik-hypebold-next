import { Categories } from '@/types/types';

export async function getCategories(): Promise<Array<Categories>> {
  const categories = await fetch(`${process.env.NEXT_PUBLIC_HYPER_API}/ad/category`);
  const data = await categories.json();
  if (categories) return await data.data;
  else return null;
}

export async function getCategoryQueriesByUrl(url: String): Promise<Array<Categories>> {
  const category = await fetch(`${process.env.NEXT_PUBLIC_HYPER_API}/ad/queries?category=${url}`);
  const data = await category.json();
  if (category) return await data.data;
  else return null;
}

export async function getCategoryDataByUrl(url: String): Promise<Array<Categories>> {
  const category = await fetch(`${process.env.NEXT_PUBLIC_HYPER_API}/ad/category/${url}`);
  const data = await category.json();
  if (category) return await data.data;
  else return null;
}
