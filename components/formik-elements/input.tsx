import { Field, ErrorMessage, useField } from 'formik';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

import classNames from '../../utils/class-names';

interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  type: string;
}

const Input: React.FC<InputProps> = ({ label, name, placeholder, type }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="my-2">
      <label htmlFor={name} className="block text-sm font-bold text-primary">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <Field
          as="input"
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          className={classNames(
            'block w-full rounded-md focus:outline-none sm:text-sm',
            meta.error && meta.touched
              ? 'border-red-500 pr-10 text-red-900 placeholder-red-200 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-600 text-gray-900 focus:border-primary focus:ring-primary'
          )}
        />
        {meta.error && meta.touched ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
          </div>
        ) : null}
      </div>
      <ErrorMessage name={name}>{message => <p className="mt-2 text-sm text-red-600">{message}</p>}</ErrorMessage>
    </div>
  );
};

export default Input;
