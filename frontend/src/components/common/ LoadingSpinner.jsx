// src/components/common/LoadingSpinner.jsx
const LoadingSpinner = ({ size = 'medium' }) => {
    const sizes = {
      small: 'h-5 w-5',
      medium: 'h-8 w-8',
      large: 'h-12 w-12'
    };
  
    return (
      <div className="flex justify-center items-center">
        <div
          className={`${sizes[size]} animate-spin rounded-full border-2 border-solid border-indigo-600 border-t-transparent`}
        />
      </div>
    );
  };
  
  export default LoadingSpinner;