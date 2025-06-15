import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/App.css";
import { FaTasks } from "react-icons/fa";
import ErrorTest from "./components/ErrorTest";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <header className="header">
          <Link to="/" className="header__link" aria-label="Todo App Home">
            <FaTasks /> Todo App
          </Link>
        </header>
        <main className="main">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/todos/:id" element={<TodoDetail />} />
              <Route path="/error-test" element={<ErrorTest />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
