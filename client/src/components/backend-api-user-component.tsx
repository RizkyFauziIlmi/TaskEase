import {
  UserRoutes,
  deleteSpecificUserCode,
  getAllUserCode,
  getCurrentUserCode,
  loginCode,
  loginWithFirebaseCode,
  logoutCode,
  signUpCode,
  toggleAdminRoleCode,
  updateCurrentUserCode,
} from "../assets/code/server-code";
import DocumentationLayout from "../layouts/documentation-layout";
import CodeMirror from "@uiw/react-codemirror";
import { solarizedLight, dracula } from "@uiw/codemirror-themes-all";
import { langs } from "@uiw/codemirror-extensions-langs";
import useTheme from "../hooks/use-theme";
import { prismaUser } from "../assets/code/prisma-code";
import { useEffect } from "react";
import { useTabState } from "../hooks/use-tab-state";

export const BackendApiUserComponent = () => {
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
            value={prismaUser}
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
            value={UserRoutes}
            editable={false}
            className="w-full rounded-lg"
            theme={isDarkVariant ? dracula : solarizedLight}
            extensions={[langs.javascript()]}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Controller</h3>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">getAllUser</h4>
            <CodeMirror
              maxHeight="500px"
              value={getAllUserCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">getCurrentUser</h4>
            <CodeMirror
              maxHeight="500px"
              value={getCurrentUserCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">updateCurrentUser</h4>
            <CodeMirror
              maxHeight="500px"
              value={updateCurrentUserCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">toggleAdminRole</h4>
            <CodeMirror
              maxHeight="500px"
              value={toggleAdminRoleCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">deleteSpecificUser</h4>
            <CodeMirror
              maxHeight="500px"
              value={deleteSpecificUserCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">signUp</h4>
            <CodeMirror
              maxHeight="500px"
              value={signUpCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">login</h4>
            <CodeMirror
              maxHeight="500px"
              value={loginCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">loginWithFirebase</h4>
            <CodeMirror
              maxHeight="500px"
              value={loginWithFirebaseCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">logout</h4>
            <CodeMirror
              maxHeight="500px"
              value={logoutCode}
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
