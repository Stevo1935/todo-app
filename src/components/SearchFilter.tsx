import React from "react";
import { useState, useCallback, ChangeEvent } from "react";
interface SearchFilterProps {
  search: string;
  setSearch: (search: string) => void;
  status: "all" | "complete" | "incomplete";
  setStatus: (status: "all" | "complete" | "incomplete") => void;
}
const SearchFilter: React.FC<SearchFilterProps> = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  const [localSearch, setLocalSearch] = useState<string>(search);

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: number | undefined;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearchChange = useCallback(
    debounce((value: string) => {
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setStatus(e.target.value as "all" | "complete" | "incomplete")
          }
          aria-label="Filter by completion status"
        >
          <option value="all">All</option>
          <option value="complete">Completed</option>
          <option value="incomplete">Pending</option>
        </select>
      </div>
    </section>
  );
};

export default SearchFilter;
