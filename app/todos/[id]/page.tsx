
'use client';

import TodoDetail from '../../components/TodoDetail';

export default function TodoDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="main">
      <TodoDetail />
    </main>
  );
}