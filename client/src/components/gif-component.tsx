interface GifComponentProps {
  id?: string;
  classname?: string | undefined;
  onclick?: () => void;
}

export const GifComponent = ({
  id = "",
  classname = undefined,
  onclick = undefined,
}: GifComponentProps) => {
  return (
    <img
      className={classname}
      src={
        id.replace(/\s+/g, "") === ""
          ? `https://i.giphy.com/media/a/giphy.webp`
          : `https://i.giphy.com/media/${id}/giphy.webp`
      }
      onClick={onclick}
    />
  );
};
