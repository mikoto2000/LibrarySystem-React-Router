import { Link } from "react-router"
export function IndexPage() {
  return (
    <main>
      <h2>書籍管理</h2>
      <Link to="/authors">Authors</Link>
      <Link to="/bookMasters">Book Masters</Link>
    </main>
  );
}

