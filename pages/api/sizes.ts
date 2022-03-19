import { Sizes } from '@/types/types';

export async function getSizes(): Promise<Sizes> {
  const sizes = await fetch(`${process.env.NEXT_PUBLIC_HYPER_API}/ad/sizes`);
  const data = await sizes.json();
  if (sizes) return await data.data;
}
