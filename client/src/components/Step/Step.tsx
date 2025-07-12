import { useState } from "react";
import styles from "./Step.module.scss";

export type StepProps = {
  id: string | number;
  stepNumber: number;
  title: string;
  description: string;
  requirements?: string;
  notes?: string;
  externalLink?: string;
  completed: boolean;
  onToggleComplete: (id: string | number) => void;
};

export function Step({
  id,
  stepNumber,
  title,
  description,
  requirements,
  notes,
  externalLink,
  completed,
  onToggleComplete,
}: StepProps) {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div className={`${styles.step} ${completed ? styles.completed : ''}`}>
      <div className={styles.stepHeader}>
        <div className={styles.stepCheckbox}>
          <input 
            type="checkbox" 
            id={`step-${id}`}
            checked={completed}
            onChange={() => onToggleComplete(id)}
            className={styles.checkbox}
          />
          <label 
            htmlFor={`step-${id}`}
            className={styles.checkboxLabel}
          ></label>
        </div>
        
        <div className={styles.stepInfo} onClick={toggleExpanded}>
          <div className={styles.stepNumberContainer}>
            <span className={styles.stepNumber}>{stepNumber}</span>
          </div>
          
          <h3 className={styles.stepTitle}>
            {title}
            <button 
              className={`${styles.expandButton} ${expanded ? styles.expanded : ''}`}
              aria-label={expanded ? "Collapse step details" : "Expand step details"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </h3>
        </div>
      </div>
      
      <div className={`${styles.stepContent} ${expanded ? styles.expanded : ''}`}>
        <p className={styles.stepDescription}>{description}</p>
        
        {requirements && (
          <div className={styles.stepSection}>
            <h4 className={styles.stepSectionTitle}>Requirements</h4>
            <p className={styles.stepSectionContent}>{requirements}</p>
          </div>
        )}
        
        {notes && (
          <div className={styles.stepSection}>
            <h4 className={styles.stepSectionTitle}>Notes</h4>
            <p className={styles.stepSectionContent}>{notes}</p>
          </div>
        )}
        
        {externalLink && (
          <div className={styles.stepSection}>
            <h4 className={styles.stepSectionTitle}>Additional Resources</h4>
            <a 
              href={externalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.stepLink}
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
                className={styles.linkIcon}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              View Resource
            </a>
          </div>
        )}
      </div>
    </div>
  );
}