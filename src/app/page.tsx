import BoardRead from './board/list/page';
import ReviewList from './board/list/page'

export const dynamic = 'force-dynamic'

export default async function Home({
  searchParams,
}: {
    searchParams: { size: number; query: string; sort: string; page: number; };
}) {
  const { size, query, sort, page } = searchParams;
  
  return (
    <main style={{height:'100%'}}>
      <ReviewList pageSize={size || 10} query={query} sort={sort}/>
    </main>
  );
}
