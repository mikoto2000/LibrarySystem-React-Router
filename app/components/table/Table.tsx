import React, { type ReactElement } from "react";
import { useNavigate } from "react-router";

type HeaderInfo = {
  name: string,
  onClick: () => void,
  footer?: string,
}[];

type ContentInfo<T> = {
  getValueFunc: (row: T) => string,
}[];

type TableProps<T> = {
  linkTo?: string,
  headerInfo: HeaderInfo,
  contentInfo: ContentInfo<T>,
  content?: T[]
};

export const Table = <T,>({ linkTo, headerInfo, contentInfo, content }: TableProps<T>): ReactElement<any, any> => {

  const navigate = useNavigate();

  return (
    <table
      className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          {
            headerInfo.map((e) => <th
              key={e.name}
              onClick={e.onClick}
            >
              {e.name}{e.footer}
            </th>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          content
            ?
            React.Children.toArray(
              content.map((e: any) => <tr
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                  if (linkTo) {
                    navigate(`/${linkTo}/${e.id}`);
                  }
                }}>{
                  React.Children.toArray(
                    contentInfo.map((c) => <td>{c.getValueFunc(e)}</td>)
                  )
                }</tr>)
            )
            :
            "表示するものがありませんでした。"
        }
      </tbody>
    </table >
  )
}

