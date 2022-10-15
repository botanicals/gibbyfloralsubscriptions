interface FormGroupProps {
  heading: string;
  message?: string;
  note?: string;
  children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ heading, message, note, children }) => {
  return (
    <fieldset className="my-4">
      <legend className="w-full px-4 py-2 text-2xl font-normal text-center text-white bg-primary">{heading}</legend>
      <div className="p-8">
        {message ? <p className="mb-4 text-lg text-primary">{message}</p> : null}
        <div className="w-full mb-4 sm:w-2/3">{children}</div>
        {note ? <small className="mt-16 text-sm text-primary">{note}</small> : null}
      </div>
    </fieldset>
  );
};

export default FormGroup;
