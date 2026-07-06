import { Link } from 'react-router';
import { PanelRightCloseIcon, PanelRightOpenIcon } from 'lucide-react';
import { useState, type ReactNode } from 'react';

type EditorLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

export function EditorLayout({ sidebar, children }: EditorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 px-6">
        <Link className="flex items-center gap-2.5" to="/">
          <img
            alt="Avvio"
            className="size-7"
            src="/brand/avatar-light.png"
          />
          <span className="text-lg font-bold tracking-tight">avvio</span>
        </Link>
        <nav className="flex items-center gap-3">
          <button
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            type="button"
          >
            {sidebarOpen ? (
              <PanelRightCloseIcon className="size-4" />
            ) : (
              <PanelRightOpenIcon className="size-4" />
            )}
            Sidebar
          </button>
          <Link
            className="text-sm text-gray-500 hover:text-gray-700"
            to="/"
          >
            Home
          </Link>
        </nav>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <main className="min-w-0 flex-1 overflow-y-auto">
          {children}
        </main>
        {sidebarOpen && (
          <aside className="w-72 shrink-0 border-l border-gray-200 overflow-y-auto bg-gray-50">
            {sidebar}
          </aside>
        )}
      </div>
    </div>
  );
}
