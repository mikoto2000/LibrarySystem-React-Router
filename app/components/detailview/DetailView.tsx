type DetailViewProps<T> = {
  content: T,
  valueInfos: {
    name: string,
    getValueFunc: (e: T) => string,
  }[],
};

export const DetailView = <T,>({ content, valueInfos }: DetailViewProps<T>) => {


  return (
    <table
      className="w-80 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <tbody>
        {valueInfos.map((e) => {
          return (
            <tr
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th>{e.name}</th><td>{e.getValueFunc(content)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
