import DocumentationLayout from "../layouts/documentation-layout";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { dracula, solarizedLight } from "@uiw/codemirror-themes-all";
import { SqlActivity, SqlFrinds, SqlNotification, SqlOtp, SqlTodo, SqlUser } from "../assets/code/slq-code";
import useTheme from "../hooks/use-theme";
import { Activity, Bell, Key, Maximize, Minimize, User, Users } from "lucide-react";
import { useBoolean } from "usehooks-ts";
import { useEffect } from "react";
import IconTodoLine from "./svg/todo-line-svg";
import { useTabState } from "../hooks/use-tab-state";

export const DatabaseOverviewComponent = () => {
  const { isDarkVariant } = useTheme();
  const { setState } = useTabState();
  const { toggle, value, setFalse } = useBoolean(false);

  useEffect(() => {
    setState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFalse();
      }
    };

    // Tambahkan event listener saat komponen dimount
    document.addEventListener("keydown", handleEscKey);

    // Cleanup: Hapus event listener saat komponen di-unmount
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DocumentationLayout>
      <div className={!value ? "relative w-full" : "w-full"}>
        <iframe
          className={`${
            value
              ? "absolute top-0 left-0 right-0 bottom-0 w-screen h-screen z-50"
              : "w-full h-96 rounded-lg"
          }`}
          src="https://dbdiagram.io/e/65865b9a89dea6279971474b/65865d6189dea62799715002"
        ></iframe>
        <button
          onClick={toggle}
          className={`${value ? "absolute right-2 top-2 z-50" : "absolute top-2 right-2"}`}
        >
          {value ? <Minimize /> : <Maximize />}
        </button>
        <div className="w-full flex flex-col gap-6 mt-6">
          <div className="w-full flex flex-col items-center gap-2">
            <h3 className="flex items-center font-bold text-xl gap-2">
              <User /> Tabel User
            </h3>
            <CodeMirror
              value={SqlUser}
              editable={false}
              className="w-full h-fit rounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.mysql()]}
            />
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            <h3 className="flex items-center font-bold text-xl gap-2">
              <Bell /> Tabel Notificcation
            </h3>
            <CodeMirror
              value={SqlNotification}
              editable={false}
              className="w-full h-fit rounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.mysql()]}
            />
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            <h3 className="flex items-center font-bold text-xl gap-2">
              <Users /> Tabel Friends
            </h3>
            <CodeMirror
              value={SqlFrinds}
              editable={false}
              className="w-full h-fit rounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.mysql()]}
            />
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            <h3 className="flex items-center font-bold text-xl gap-2">
              <Activity /> Tabel Activity
            </h3>
            <CodeMirror
              value={SqlActivity}
              editable={false}
              className="w-full h-fit rounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.mysql()]}
            />
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            <h3 className="flex items-center font-bold text-xl gap-2">
              <IconTodoLine /> Tabel Todo
            </h3>
            <CodeMirror
              value={SqlTodo}
              editable={false}
              className="w-full h-fit rounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.mysql()]}
            />
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            <h3 className="flex items-center font-bold text-xl gap-2">
              <Key /> Tabel Otp
            </h3>
            <CodeMirror
              value={SqlOtp}
              editable={false}
              className="w-full h-fit rounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.mysql()]}
            />
          </div>
        </div>
      </div>
    </DocumentationLayout>
  );
};
