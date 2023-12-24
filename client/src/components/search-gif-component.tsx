import { useQuery } from "@tanstack/react-query";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { GifComponent } from "./gif-component";
import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { useCopyToClipboard, useDebounce } from "usehooks-ts";
import { toast } from "react-toastify";
import useTheme from "../hooks/use-theme";

const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY_DEV);

export const SearchGifComponent = () => {
  const [input, setInput] = useState<string>("");
  const { isDarkVariant } = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, copy] = useCopyToClipboard();
  const debounceInput = useDebounce<string>(input, 1500);

  const fetchGiphy = async () => {
    const result = await gf.search(debounceInput, {
      sort: "relevant",
      type: "gifs",
    });

    return result;
  };

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["search-giphy", debounceInput],
    queryFn: fetchGiphy,
  });

  return (
    <div className="bg-base-200 rounded-md overflow-y-auto p-2">
      <div className="text-primary bg-base-200 flex gap-2 p-2 rounded-md">
        <Search className="opacity-50" />
        <input
          type="text"
          placeholder="Search GIFs here..."
          className="outline-none bg-transparent input-ghost w-full max-w-xs"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 max-h-48 overflow-x-hidden overflow-y-auto">
        {isPending && <Loader2 className="animate-spin" />}
        {isSuccess &&
          data.data.map((value) => (
            <GifComponent
              key={value.id}
              classname="w-full h-full object-contain cursor-pointer hover:scale-105 transition-all"
              id={(value.id as string) || ""}
              onclick={() => {
                copy(value.id as string);
                toast.success("Gif ID Copied to Clipboard", {
                  delay: 1500,
                  theme: isDarkVariant ? "dark" : "light",
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              }}
            />
          ))}
      </div>
    </div>
  );
};
