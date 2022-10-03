import { Brands } from '@/types/types';

export async function getBrands(): Promise<Brands> {
  const brands = await fetch(`${process.env.NEXT_PUBLIC_HYPEBOLD_API}/ad/brands`);
  const data = await brands.json();
  if (brands) return await data.data;
}
