import { Link as RrLink } from "react-router";

type LinkProps = {
  label: string,
  to: string,
};

export const Link: React.FC<LinkProps> = ({ label, to }) => {

  return (
    <RrLink
      className="text-blue-600 dark:text-blue-500 hover:underline"
      to={to}>{label}</RrLink>
  )
}
