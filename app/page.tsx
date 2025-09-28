
'use client'; 

import TodoList from './components/TodoList';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/TodoList.module.css';

export default function Home() {
  return (
    <main className="main">
      <ErrorBoundary>
      <TodoList />
      </ErrorBoundary>
    </main>
  );
}