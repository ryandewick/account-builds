import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBuildSteps } from "../../api/builds";
import { Step } from "../../components/Step/Step";
import styles from "./BuildSteps.module.scss";

type StepType = {
  id: string | number;
  step_number: number;
  build_name: string;
  title: string;
  description: string;
  requirements?: string;
  notes?: string;
  external_link?: string;
  completed?: boolean;
};

export default function BuildDetail() {
  const { id } = useParams<{ id: string }>();
  const [steps, setSteps] = useState<StepType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchSteps() {
      if (!id) return;

      try {
        setLoading(true);
        const fetchedSteps = await getBuildSteps(id);

        // Get completed steps from localStorage
        const savedProgress = localStorage.getItem(`build-progress-${id}`);
        const completedSteps = savedProgress ? JSON.parse(savedProgress) : {};

        // Mark steps as completed based on localStorage data
        const stepsWithProgress = fetchedSteps.map((step: StepType) => ({
          ...step,
          completed: completedSteps[step.id] || false
        }));

        setSteps(stepsWithProgress);

        // Calculate progress
        const completedCount = stepsWithProgress.filter((step: { completed: any; }) => step.completed).length;
        const totalSteps = stepsWithProgress.length;
        setProgress(totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch steps:", error);
        setError("Failed to load build steps. Please try again later.");
        setLoading(false);
      }
    }

    fetchSteps();
  }, [id]);

  const toggleStepCompletion = (stepId: string | number) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );

    setSteps(updatedSteps);

    // Save progress to localStorage
    const completedSteps = updatedSteps.reduce((acc, step) => {
      if (step.completed) {
        acc[step.id] = true;
      }
      return acc;
    }, {} as Record<string | number, boolean>);

    localStorage.setItem(`build-progress-${id}`, JSON.stringify(completedSteps));

    // Update progress percentage
    const completedCount = updatedSteps.filter(step => step.completed).length;
    const totalSteps = updatedSteps.length;
    setProgress(totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0);
  };

  const resetProgress = () => {
    localStorage.removeItem(`build-progress-${id}`);
    const resetSteps = steps.map(step => ({ ...step, completed: false }));
    setSteps(resetSteps);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading build steps...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (steps.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>No steps found for this build.</p>
        <Link to="/explore-builds" className="btn btn-primary">
          Back to Builds
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.buildStepsPage}>
      <div className={styles.buildHeader}>
        <h1 className={styles.buildTitle}>{steps[0]?.build_name}</h1>
        <p className={styles.buildDescription}>
          Follow these steps to complete your build. Check off steps as you complete them.
        </p>

        <div className={styles.progressContainer}>
          <div className={styles.progressInfo}>
            <span>Your Progress: {progress}%</span>
            <button 
              className={styles.resetButton}
              onClick={resetProgress}
              disabled={progress === 0}
            >
              Reset Progress
            </button>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className={styles.stepsContainer}>
        {steps.map((step) => (
          <Step
            key={step.id}
            id={step.id}
            stepNumber={step.step_number}
            title={step.title}
            description={step.description}
            requirements={step.requirements}
            notes={step.notes}
            externalLink={step.external_link}
            completed={step.completed || false}
            onToggleComplete={toggleStepCompletion}
          />
        ))}
      </div>

      <div className={styles.buildFooter}>
        <Link to="/explore-builds" className="btn btn-outline">
          Back to Builds
        </Link>
      </div>
    </div>
  );
}
