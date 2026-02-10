import { redirect } from 'next/navigation';

export default function AluminiumSlugPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const segments = params.slug ?? [];
  // Old URLs: /aluminium/productSlug or /aluminium/categorySlug/productSlug
  const productSlug = segments.length > 0 ? segments[segments.length - 1] : null;
  if (productSlug) redirect(`/products/${productSlug}`);
  redirect('/products');
}
