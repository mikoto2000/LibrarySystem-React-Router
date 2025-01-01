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
      <pre>
        {JSON.stringify(authors, null, 2)}
      </pre>
    </main>
  )
}
