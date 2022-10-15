import classNames from '../../../utils/class-names';

interface LoadingSpinnerProps {
  dark?: boolean;
}

interface SubmitButtonProps {
  submitting: boolean;
  submitText: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ dark }) => {
  return (
    <svg className={classNames(dark ? 'text-black dark:text-white' : 'text-white', 'animate-spin -ml-1 mr-3 h-5 w-5')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ submitting, submitText }) => {
  return (
    <button
      type="submit"
      className="flex items-center justify-center w-full px-6 py-3 text-base font-bold text-white uppercase border border-transparent rounded-md shadow-sm bg-primary disabled:text-gray-200 disabled:bg-gray-500 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      disabled={submitting}
    >
      {submitting ? (
        <>
          <LoadingSpinner /> Submitting
        </>
      ) : (
        submitText
      )}
    </button>
  );
};

export default SubmitButton;
