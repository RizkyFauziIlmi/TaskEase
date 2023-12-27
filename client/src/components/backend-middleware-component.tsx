import { useEffect } from "react";
import { useTabState } from "../hooks/use-tab-state";
import DocumentationLayout from "../layouts/documentation-layout";
import CodeMirror from "@uiw/react-codemirror";
import useTheme from "../hooks/use-theme";
import { dracula, solarizedLight } from "@uiw/codemirror-themes-all";
import { langs } from "@uiw/codemirror-extensions-langs";
import {
  backendAuthMiddlewareCode,
  rateLimitCode,
} from "../assets/code/server-code";

export const BackendMiddlewareComponent = () => {
  const { setState } = useTabState();
  const { isDarkVariant } = useTheme();

  useEffect(() => {
    setState(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DocumentationLayout>
      <h3 className="text-2xl font-bold">Auth Middleware</h3>
      <CodeMirror
        maxHeight="500px"
        value={backendAuthMiddlewareCode}
        editable={false}
        className="w-full rounded-lg"
        theme={isDarkVariant ? dracula : solarizedLight}
        extensions={[langs.javascript()]}
      />
      <h3 className="text-2xl font-bold">Rate Limiter Express</h3>
      <CodeMirror
        maxHeight="500px"
        value={rateLimitCode}
        editable={false}
        className="w-full rounded-lg"
        theme={isDarkVariant ? dracula : solarizedLight}
        extensions={[langs.javascript()]}
      />
    </DocumentationLayout>
  );
};
