import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="app-main">
      {children}
    </main>
  );
}

export default MainLayout;
