type Author = {
  id: number,
  name: string,
};

type AuthorPageProps = {
  authors: Author[],
}

export const AuthorPage = ({ authors }: AuthorPageProps) => {
  return (
    <main>
      <ul>
        {
          authors
            ?
            authors.map((e) => <li>{e.id}: {e.name}</li>)
            :
            <>表示要素がありませんでした</>
        }
      </ul>
    </main>
  )
}
