import { ReactNode } from "react";

interface ContentLayoutProps {
  children: ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="flex flex-col w-full md:w-[75%] bg-base-200">
      {children}
    </div>
  );
}
