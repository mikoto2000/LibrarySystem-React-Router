import type { ReactElement } from "react";

type LabelAndSelectProps = {
  children: ReactElement[],
  label: string,
  selectName: string,
  multiple?: boolean,
  required?: boolean,
};

export const LabelAndSelect: React.FC<LabelAndSelectProps> = ({
  children,
  label,
  selectName,
  multiple,
  required
}) => {
  return (
    <label>{label}:
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name={selectName}
        multiple={multiple}
        required={required}
      >
        {children}
      </select>
    </label>
  )
}
