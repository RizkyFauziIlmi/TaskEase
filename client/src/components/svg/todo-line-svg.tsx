// icon:todo-line | Remix Icon https://remixicon.com/ | Remix Design
import * as React from "react";

function IconTodoLine(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M17 2h3a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h3V0h2v2h6V0h2v2zm0 2v2h-2V4H9v2H7V4H5v16h14V4h-2zM7 8h10v2H7V8zm0 4h10v2H7v-2z" />
    </svg>
  );
}

export default IconTodoLine;
