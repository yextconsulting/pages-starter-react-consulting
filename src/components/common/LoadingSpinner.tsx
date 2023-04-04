import "src/components/common/LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      <div className="LoadingSpinner-container">
        <div className="LoadingSpinner-spinner" />
      </div>
    </div>
  );
}
