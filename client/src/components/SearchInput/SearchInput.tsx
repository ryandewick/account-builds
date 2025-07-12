import { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from "react";
import styles from "./SearchInput.module.scss";

type SearchInputProps = {
  label?: string;
  placeholder?: string;
  buttonText?: string;
  searchValue?: string;
  onChangeValue: (value: string) => void;
  onSearch: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
};

export function SearchInput({
  label,
  placeholder = "Search...",
  buttonText = "Search",
  searchValue = "",
  onSearch,
  onChangeValue,
  className = "",
  autoFocus = false,
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    onChangeValue(e.target.value);
  }

  function handleEnterKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSearch(searchValue);
    }
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handleClear() {
    onChangeValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div className={`${styles.searchContainer} ${className}`}>
      {label && (
        <label htmlFor="search-input" className={styles.searchLabel}>
          {label}
        </label>
      )}

      <div className={`${styles.searchInput} ${isFocused ? styles.focused : ""}`}>
        <div className={styles.searchIconWrapper}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={styles.searchIcon}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <input
          ref={inputRef}
          id="search-input"
          type="text"
          value={searchValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleEnterKey}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.input}
          aria-label={label || "Search"}
        />

        {searchValue && (
          <button 
            type="button" 
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        <button
          type="button"
          className={styles.searchButton}
          onClick={() => onSearch(searchValue)}
          aria-label={buttonText}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
