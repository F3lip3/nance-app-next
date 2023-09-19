'use client';

import { trpc } from '@/lib/trpc/client';

export default function Page() {
  const { data } = trpc.categories.getCategories.useQuery();

  if (!data) return <div>Loading...</div>;
  if (!data.categories.length) return <div>No categories found!</div>;

  return (
    <div>
      <b>Categories:</b>
      <br />
      <ul>
        {data.categories.map(category => (
          <li key={category.publicId}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}
