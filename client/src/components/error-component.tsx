import { RefreshCw, ServerCrash } from "lucide-react";

interface ErrorComponentProps {
    message: string;
    callback: () => void;
}

export const ErrorComponent = ({ message, callback }: ErrorComponentProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <ServerCrash className="w-10 h-10" />
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="font-bold text-xs">{message}</p>
        <button className="btn btn-primary btn-sm" onClick={callback}>
            <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>
    </div>
  );
};
