import { Link } from "react-router"
export function IndexPage() {
  return (
    <main>
      <h2>マスタ管理</h2>
      <ul>
        <li><Link to="/bookStockStatuses">Book Stock Status</Link></li>
      </ul>
      <h2>書籍管理</h2>
      <ul>
        <li><Link to="/authors">Authors</Link></li>
        <li><Link to="/bookMasters">Book Masters</Link></li>
      </ul>
    </main>
  );
}

