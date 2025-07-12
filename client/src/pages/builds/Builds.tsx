import { useState, useEffect } from "react";
import { getBuilds } from "../../api/builds";
import { Card } from "../../components/Card/Card";
import styles from "./Builds.module.scss";

type Build = {
  id: number;
  name: string;
  description: string;
  difficulty?: string;
  estimatedTime?: string;
  tags?: string[];
};

export default function Builds() {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const buildsPerPage = 9; // Number of builds to show per page

  useEffect(() => {
    async function fetchBuilds() {
      try {
        setIsLoading(true);
        const data = await getBuilds();
        setBuilds(data);
      } catch (error) {
        console.error("Failed to fetch builds:", error);
        setError("Failed to load builds. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBuilds();
  }, []);

  // Calculate pagination
  const indexOfLastBuild = currentPage * buildsPerPage;
  const indexOfFirstBuild = indexOfLastBuild - buildsPerPage;
  const currentBuilds = builds.slice(indexOfFirstBuild, indexOfLastBuild);
  const totalPages = Math.ceil(builds.length / buildsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className={styles.buildsPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Explore All Account Builds</h1>
        <p className={styles.pageDescription}>
          Browse through all available builds to optimize your account. Click on a build to view its step-by-step guide.
        </p>
      </div>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading builds...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className={styles.resultsInfo}>
            <p>
              {builds.length === 0
                ? "No builds available at the moment."
                : builds.length === 1
                ? "1 build available"
                : `Showing ${indexOfFirstBuild + 1}-${Math.min(indexOfLastBuild, builds.length)} of ${builds.length} builds`}
            </p>
          </div>

          <div className={styles.buildsGrid}>
            {currentBuilds.map((build) => (
              <Card key={build.id} data={build} />
            ))}
          </div>

          {builds.length > buildsPerPage && (
            <div className={styles.pagination}>
              <button 
                onClick={goToPrevPage} 
                disabled={currentPage === 1}
                className={styles.paginationButton}
                aria-label="Previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`${styles.pageNumber} ${currentPage === i + 1 ? styles.activePage : ''}`}
                    aria-label={`Page ${i + 1}`}
                    aria-current={currentPage === i + 1 ? 'page' : undefined}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
