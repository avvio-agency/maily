import { Link } from 'react-router';
import type { ReactNode } from 'react';

type EditorLayoutProps = {
  children: ReactNode;
};

export function EditorLayout({ children }: EditorLayoutProps) {
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
          <Link
            className="text-sm text-gray-500 hover:text-gray-700"
            to="/"
          >
            Home
          </Link>
        </nav>
      </header>
      <main className="min-w-0 flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
