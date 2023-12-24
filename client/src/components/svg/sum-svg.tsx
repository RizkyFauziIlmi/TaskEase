// icon:sum | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from "react";

function IconSum(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M18 16v2a1 1 0 01-1 1H6l6-7-6-7h11a1 1 0 011 1v2" />
    </svg>
  );
}

export default IconSum;
