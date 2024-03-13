import BoardRead from './board/list/page';
import SearchList from './components/searchList';

export default async function Home({
  searchParams,
}: {
  searchParams: { size: number; query: string };
}) {
  const { size, query } = searchParams;
  // console.log('searchParams', searchParams);

  return (
    <main>
      <SearchList pageSize={size || 10} query={query} />
      <BoardRead pageSize={size || 10} query={query} />
    </main>
  );
}
