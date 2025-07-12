import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";

type CardProps = {
  data: {
    id: number;
    name: string;
    description?: string;
    difficulty?: string;
    estimatedTime?: string;
    tags?: string[];
  };
  className?: string;
};

export function Card({ data, className = "" }: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/build/${data.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/build/${data.id}`);
    }
  };

  // Generate a solid background color for the card header
  const getHeaderColor = () => {
    const colors = [
      '#2563eb', // Blue
      '#16a34a', // Green
      '#b45309', // Dark amber (better contrast with white)
      '#7e22ce', // Purple
      '#be123c', // Red
      '#0d9488', // Teal
    ];

    // Use the data.id to consistently get the same color for the same build
    const index = data.id % colors.length;
    return colors[index];
  };

  // Determine difficulty badge color
  const getDifficultyColor = () => {
    if (!data.difficulty) return '';

    switch(data.difficulty.toLowerCase()) {
      case 'easy': return styles.difficultyEasy;
      case 'medium': return styles.difficultyMedium;
      case 'hard': return styles.difficultyHard;
      default: return '';
    }
  };

  return (
    <article 
      className={`${styles.card} ${className}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-labelledby={`card-title-${data.id}`}
    >
      <header 
        className={styles.cardHeader} 
        style={{ backgroundColor: getHeaderColor() }}
      >
        <h2 id={`card-title-${data.id}`} className={styles.cardTitle}>{data.name}</h2>
      </header>

      <div className={styles.cardBody}>
        <p className={styles.cardDescription}>
          {data.description || "No description available for this build."}
        </p>

        <div className={styles.cardMeta} aria-label="Build details">
          {data.difficulty && (
            <span 
              className={`${styles.cardBadge} ${getDifficultyColor()}`}
              aria-label={`Difficulty: ${data.difficulty}`}
            >
              {data.difficulty}
            </span>
          )}

          {data.estimatedTime && (
            <span className={styles.cardTime} aria-label={`Estimated time: ${data.estimatedTime}`}>
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
                aria-hidden="true"
                role="img"
              >
                <title>Clock</title>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {data.estimatedTime}
            </span>
          )}
        </div>

        {data.tags && data.tags.length > 0 && (
          <div className={styles.cardTags} aria-label="Tags">
            {data.tags.map((tag, index) => (
              <span key={index} className={styles.cardTag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <footer className={styles.cardFooter}>
        <button 
          onClick={handleClick} 
          className={styles.cardButton}
          aria-label={`View ${data.name} build guide`}
        >
          View Build Guide
        </button>
      </footer>
    </article>
  );
}
