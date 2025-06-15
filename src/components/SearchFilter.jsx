import { useState, useCallback } from "react";
function SearchFilter({ search, setSearch, status, setStatus }) {
  const [localSearch, setLocalSearch] = useState(search);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearchChange = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 500),
    [setSearch]
  );

  return (
    <section className="search-filter" aria-label="Search and Filter Todos">
      <div className="form-group">
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          value={localSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value);
            handleSearchChange(e.target.value);
          }}
          placeholder="Search todos..."
          aria-label="Search todos by title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by completion status"
        >
          <option value="all">All</option>
          <option value="complete">Completed</option>
          <option value="incomplete">Pending</option>
        </select>
      </div>
    </section>
  );
}

export default SearchFilter;
