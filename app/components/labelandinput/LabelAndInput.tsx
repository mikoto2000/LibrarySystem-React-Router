type LabelAndInputProps = {
  label: string,
  inputType: string,
  inputName: string,
  inputDefaultValue: any,
  readOnly?: boolean,
  required?: boolean,
};

export const LabelAndInput: React.FC<LabelAndInputProps> = ({ label, inputType, inputName, inputDefaultValue, readOnly, required }) => {

  return (
    <label>{label}: <input
      className="block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      type={inputType}
      name={inputName}
      defaultValue={inputDefaultValue}
      readOnly={readOnly}
      required={required}
    /></label>
  )
}
