import { Field, ErrorMessage, useField } from 'formik';

import classNames from '../../utils/class-names';

interface TextareaProps {
  label: string;
  placeholder?: string;
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, placeholder, name }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="my-2">
      <label htmlFor={name} className="block text-sm font-bold text-primary">
        {label}
      </label>
      <Field
        as="textarea"
        id={name}
        name={name}
        placeholder={placeholder}
        rows={4}
        className={classNames(
          'block w-full rounded-md sm:text-sm mt-1 shadow-sm',
          meta.error && meta.touched
            ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500 placeholder-red-200'
            : 'border-gray-600 text-gray-900 focus:border-primary focus:ring-primary'
        )}
      />
      <ErrorMessage name={name}>{message => <p className="mt-2 text-sm text-red-600">{message}</p>}</ErrorMessage>
    </div>
  );
};

export default Textarea;
