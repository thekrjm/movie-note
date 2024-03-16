import { redirect } from 'next/navigation';
import BoardRead from './board/list/page';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic'

export default async function Home({
  searchParams,
}: {
    searchParams: { size: number; query: string; sort: string; };
}) {
  const { size, query, sort } = searchParams;
  
  return (
    <main>
        <BoardRead pageSize={size || 10} query={query} sort={sort} />
    </main>
  );
}
