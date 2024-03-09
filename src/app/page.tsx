import BoardRead from "./board/read/page";


export default async function Home({ searchParams }: { searchParams: { size: number, query: string } }) {
  const { size, query } = searchParams
  return (
    <main>
      <BoardRead pageSize={size || 10} query={query} />
    </main>
  );
}
