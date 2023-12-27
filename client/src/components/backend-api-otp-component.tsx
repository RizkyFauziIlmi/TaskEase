import { useEffect } from "react";
import { useTabState } from "../hooks/use-tab-state";
import useTheme from "../hooks/use-theme";
import CodeMirror from "@uiw/react-codemirror";
import DocumentationLayout from "../layouts/documentation-layout";
import { dracula, solarizedLight } from "@uiw/codemirror-themes-all";
import { langs } from "@uiw/codemirror-extensions-langs";
import { prismaOtp } from "../assets/code/prisma-code";
import {
  OtpRoutes,
  requestRecoveryCode,
  resetPasswordCode,
  verifyOtpCode,
} from "../assets/code/server-code";

export const BackendApiOtpComponent = () => {
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
            value={prismaOtp}
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
            value={OtpRoutes}
            editable={false}
            className="w-full rounded-lg"
            theme={isDarkVariant ? dracula : solarizedLight}
            extensions={[langs.javascript()]}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Controller</h3>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">requestRecovery</h4>
            <CodeMirror
              maxHeight="500px"
              value={requestRecoveryCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">verfiyOtp</h4>
            <CodeMirror
              maxHeight="500px"
              value={verifyOtpCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">resetPassword</h4>
            <CodeMirror
              maxHeight="500px"
              value={resetPasswordCode}
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
