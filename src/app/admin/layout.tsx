import "../globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-header">
          <h1>ByteQue</h1>
        </div>
        <nav>
          <ul>
            <li><a href="/admin/support">Destek Talepleri</a></li>
            <li><a href="/admin/content">İçerik Yönetimi</a></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
