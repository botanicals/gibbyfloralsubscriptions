import { Dispatch, SetStateAction } from 'react';
import classNames from '../../utils/class-names';

interface CheckboxProps {
  label: string;
  name: string;
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  readOnly?: boolean;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, value, setValue, readOnly, disabled }) => {
  return (
    <div className="flex items-center w-full">
      <input
        type="checkbox"
        id={name}
        name={name}
        className={classNames('w-5 h-5', disabled ? 'border-gray-500 text-gray-500 forcus:ring-gray-500' : ' border-secondary text-secondary focus:ring-secondary')}
        checked={value}
        onChange={() => setValue(value => !value)}
        readOnly={readOnly}
        disabled={disabled}
      />
      <label htmlFor={name} className={classNames('ml-3 text-xl font-bold uppercase', disabled ? 'text-gray-500' : 'text-secondary')}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
