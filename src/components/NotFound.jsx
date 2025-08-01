import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found" role="alert">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="notfound-link" to="/">
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;
