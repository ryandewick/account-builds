import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getBuilds } from "../api/builds";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { Card } from "../components/Card/Card";
import styles from "./Index.module.scss";

type Build = {
  id: number;
  name: string;
  description: string;
  difficulty?: string;
  estimatedTime?: string;
  tags?: string[];
};

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Build[]>([]);
  const [featuredBuilds, setFeaturedBuilds] = useState<Build[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured builds on component mount
  useEffect(() => {
    async function fetchFeaturedBuilds() {
      try {
        const allBuilds = await getBuilds();
        // For now, just use the first 3 builds as featured
        setFeaturedBuilds(allBuilds.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch featured builds:", err);
        setError("Failed to load featured builds. Please try again later.");
      }
    }

    fetchFeaturedBuilds();
  }, []);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (searchValue.trim() === "") {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      const builds = await getBuilds();
      const filteredResults = builds.filter((build: Build) =>
        build.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      setSearchResults(filteredResults);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Search failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [searchValue]);

  // Auto-search with debounce as user types
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchValue.trim() !== "") {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce delay

    return () => clearTimeout(debounceTimeout);
  }, [searchValue, handleSearch]);

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to Account Build Guides</h1>
          <p className={styles.heroSubtitle}>
            Discover optimized OSRS account builds and follow step-by-step guides to achieve your goals
          </p>

          <div className={styles.searchContainer}>
            <SearchInput
              placeholder="Search for builds (e.g., Pure, Zerker, Main)..."
              searchValue={searchValue}
              onChangeValue={setSearchValue}
              onSearch={handleSearch}
              autoFocus
              className={styles.heroSearch}
            />
          </div>

          {isLoading && <p className={styles.searchMessage}>Searching...</p>}
          {error && <p className={styles.searchError}>{error}</p>}

          {searchResults.length > 0 && (
            <div className={styles.searchResults}>
              <h2 className={styles.searchResultsTitle}>
                Search Results for "{searchValue}"
                <span className={styles.resultCount}>
                  {searchResults.length === 1 ? '1 build found' : `${searchResults.length} builds found`}
                </span>
              </h2>
              <div className={styles.cardsGrid}>
                {searchResults.map((build) => (
                  <Card key={build.id} data={build} />
                ))}
              </div>
            </div>
          )}

          {searchResults.length === 0 && searchValue.trim() !== "" && !isLoading && !error && (
            <div className={styles.searchResults}>
              <h2 className={styles.searchResultsTitle}>
                Search Results for "{searchValue}"
                <span className={styles.resultCount}>0 builds found</span>
              </h2>
              <p className={styles.noResultsMessage}>
                No builds found matching your search term. Try a different keyword or explore our featured builds below.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Builds</h2>

          {featuredBuilds.length > 0 ? (
            <div className={styles.cardsGrid}>
              {featuredBuilds.map((build) => (
                <Card key={build.id} data={build} />
              ))}
            </div>
          ) : (
            <p className={styles.emptyMessage}>No featured builds available at the moment.</p>
          )}

          <div className={styles.exploreMore}>
            <Link to="/explore-builds" className="btn btn-primary">
              Explore All Builds
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className="container">
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className={styles.infoTitle}>Step-by-Step Guides</h3>
              <p className={styles.infoText}>
                Follow detailed instructions to optimize your account build efficiently.
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h3 className={styles.infoTitle}>Track Your Progress</h3>
              <p className={styles.infoText}>
                Check off completed steps and save your progress as you build your account.
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className={styles.infoTitle}>Save Time</h3>
              <p className={styles.infoText}>
                Optimize your gameplay with efficient account building strategies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
