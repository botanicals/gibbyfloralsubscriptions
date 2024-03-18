import { Field, ErrorMessage, useField } from 'formik';
import classNames from '../../utils/class-names';

interface CheckboxProps {
  label: string;
  description?: string;
  name: string;
  readOnly?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, description, name, readOnly }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="relative flex items-start my-2">
      <div className="flex items-center h-5">
        <Field
          as="input"
          type="checkbox"
          id={name}
          name={name}
          className={classNames('w-4 h-4  rounded', meta.error && meta.touched ? 'border-red-500 text-red-500 focus:ring-red-500' : 'border-gray-600 text-primary focus:ring-primary')}
          readOnly={readOnly}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="font-bold text-primary">
          {label}
        </label>
        <p className="text-xs text-primary">{description}</p>
        <ErrorMessage name={name}>{message => <p className="mt-2 text-sm text-red-600">{message}</p>}</ErrorMessage>
      </div>
    </div>
  );
};

export default Checkbox;
