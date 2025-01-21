import { Link } from "react-router";

type TocSection = {
  title: string,
  item: {
    label: string,
    to: string,
  }[],
};

export type TocProps = {
  toc: TocSection[],
};


export const Toc: React.FC<TocProps> = (props: TocProps) => {
  return (
    <>
      {
        props.toc.map((e) => (
          <>
            <h2 className="font-bold text-2xl mt-2 mb-1">{e.title}</h2>
            <ul className="list-disc list-inside">
              {
                e.item.map((i) => (
                  <>
                    <li><Link className="text-blue-600 dark:text-blue-500 hover:underline" to={i.to}>{i.label}</Link></li>
                  </>
                ))
              }
            </ul>
          </>
        )
        )
      }
    </>
  )
}
