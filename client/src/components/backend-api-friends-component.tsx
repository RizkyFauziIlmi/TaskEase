import { useEffect } from "react";
import { useTabState } from "../hooks/use-tab-state";
import useTheme from "../hooks/use-theme";
import DocumentationLayout from "../layouts/documentation-layout";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { dracula, solarizedLight } from "@uiw/codemirror-themes-all";
import { prismaFriends } from "../assets/code/prisma-code";
import { FriendsRoutes, acceptFriendCode, addFriendCode, deleteFriendCode, getAllFriendCode, getSearchCode, rejectFriendCode } from "../assets/code/server-code";

export const BackendApiFriendsComponent = () => {
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
            value={prismaFriends}
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
            value={FriendsRoutes}
            editable={false}
            className="w-full rounded-lg"
            theme={isDarkVariant ? dracula : solarizedLight}
            extensions={[langs.javascript()]}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Controller</h3>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">getSearch</h4>
            <CodeMirror
              maxHeight="500px"
              value={getSearchCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">addFriend</h4>
            <CodeMirror
              maxHeight="500px"
              value={addFriendCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">acceptFriend</h4>
            <CodeMirror
              maxHeight="500px"
              value={acceptFriendCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">rejectFriend</h4>
            <CodeMirror
              maxHeight="500px"
              value={rejectFriendCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">deleteFriend</h4>
            <CodeMirror
              maxHeight="500px"
              value={deleteFriendCode}
              editable={false}
              className="w-full hounded-lg"
              theme={isDarkVariant ? dracula : solarizedLight}
              extensions={[langs.javascript()]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold">allFriend</h4>
            <CodeMirror
              maxHeight="500px"
              value={getAllFriendCode}
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
