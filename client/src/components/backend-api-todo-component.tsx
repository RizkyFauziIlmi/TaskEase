import { dracula, solarizedLight } from "@uiw/codemirror-themes-all";
import { prismaTodo } from "../assets/code/prisma-code";
import useTheme from "../hooks/use-theme";
import DocumentationLayout from "../layouts/documentation-layout";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { TodoRoutes, createTodoCode, deleteTodoCode, getCurrentTodoCode, getSingleTodoCode, toggleCompletedTodoCode, updateTodoCode } from "../assets/code/server-code";
import { useTabState } from "../hooks/use-tab-state";
import { useEffect } from "react";

export const BackendApiTodoComponent = () => {
  const { isDarkVariant } = useTheme();
  const { setState } = useTabState();

  useEffect(() => {
    setState(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <DocumentationLayout>
      <div className="w-full flex flex-col gap-4">
        <div>
          <h3 className="text-2xl font-bold">Model</h3>
          <CodeMirror
            maxHeight="500px"
            value={prismaTodo}
            editable={false}
            className="w-full rounded-lg"
            theme={isDarkVariant ? dracula : solarizedLight}
            extensions={[langs.javascript()]}
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Routes</h3>
          <CodeMirror
            maxHeight="500px"
            value={TodoRoutes}
            editable={false}
            className="w-full rounded-lg"
            theme={isDarkVariant ? dracula : solarizedLight}
            extensions={[langs.javascript()]}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Controller</h3>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">createTodo</h4>
            <CodeMirror
              maxHeight="500px"
              value={createTodoCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">getCurrentTodo</h4>
            <CodeMirror
              maxHeight="500px"
              value={getCurrentTodoCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">getSingleTodo</h4>
            <CodeMirror
              maxHeight="500px"
              value={getSingleTodoCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">updateTodo</h4>
            <CodeMirror
              maxHeight="500px"
              value={updateTodoCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">deleteTodo</h4>
            <CodeMirror
              maxHeight="500px"
              value={deleteTodoCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">toggleCompleted</h4>
            <CodeMirror
              maxHeight="500px"
              value={toggleCompletedTodoCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
        </div>
      </div>
    </DocumentationLayout>
  );
};
