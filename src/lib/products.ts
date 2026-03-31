import rawProducts from '@/data/products.json';

export type ProductItem = {
  id: string;
  name: string;
  category: string;
  range?: string;
  image?: string | null;
  tags?: string[];
};

function isProductItem(x: unknown): x is ProductItem {
  if (!x || typeof x !== 'object') return false;
  const v = x as Record<string, unknown>;
  return typeof v.id === 'string' && typeof v.name === 'string' && typeof v.category === 'string';
}

export function getProductItems(): ProductItem[] {
  const list = Array.isArray(rawProducts) ? rawProducts : [];
  return list.filter(isProductItem);
}

