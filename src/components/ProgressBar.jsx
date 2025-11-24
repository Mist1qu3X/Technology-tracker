const ProgressBar = ({ progress, label = '', height = 20, showPercentage = true }) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-container">
      {(label || showPercentage) && (
        <div className="progress-header">
          {label && <span className="progress-label">{label}</span>}
          {showPercentage && (
            <span className="progress-percentage">{normalizedProgress}%</span>
          )}
        </div>
      )}
      
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;