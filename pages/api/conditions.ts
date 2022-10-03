import { Conditions } from '@/types/types';

export async function getConditions(): Promise<Conditions> {
  const conditions = await fetch(`${process.env.NEXT_PUBLIC_HYPEBOLD_API}/ad/conditions`);
  const data = await conditions.json();
  if (conditions) return await data.data;
}
