import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import userApi from "../../api/user-api";
import { Ban, ClipboardEdit, Edit, Loader2 } from "lucide-react";
import moment from "moment";
import { GifComponent } from "../gif-component";
import { SearchGifComponent } from "../search-gif-component";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserRequest } from "../../../types";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useTheme from "../../hooks/use-theme";
import { useBoolean } from "usehooks-ts";

const FormSchema = z.object({
  bannerGifId: z.string(),
  profileGifId: z.string(),
  username: z.string(),
});

interface UpdateAccountModalProps {
  defaultValueBannerId: string;
  defaultValueProfileId: string;
  defaultValueUsername: string;
}

export const UpdateAccountModal = ({
  defaultValueBannerId,
  defaultValueProfileId,
  defaultValueUsername,
}: UpdateAccountModalProps) => {
  const [cookies] = useCookies(["token"]);
  const queryClient = useQueryClient();
  const { isDarkVariant } = useTheme();
  const { toggle, value, setFalse } = useBoolean(false);

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["GetUserData"],
    queryFn: () => userApi.getUserData(cookies.token),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bannerGifId: "",
      profileGifId: "",
      username: "",
    },
  });

  useEffect(() => {
    setValue("bannerGifId", defaultValueBannerId);
    setValue("profileGifId", defaultValueProfileId);
    setValue("username", defaultValueUsername);
  }, [
    defaultValueBannerId,
    defaultValueProfileId,
    setValue,
    defaultValueUsername,
  ]);

  const updateUserMutation = useMutation({
    mutationFn: (newUser: updateUserRequest) =>
      userApi.updateCurrentUser(cookies.token, newUser),
    onSuccess: (data) => {
      toast.success(data.data.message, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["GetUserData"],
      }),
  });

  const onSubmit = handleSubmit((formData) => {
    // updateTodo(formData.title, formData.description, formData.category);
    updateUserMutation.mutate({
      bannerId: formData.bannerGifId,
      profileId: formData.profileGifId,
      username: formData.username,
    });
    reset({ bannerGifId: "", profileGifId: "", username: "" });
    setFalse();
  });

  const isNotChange =
    watch("bannerGifId") === data?.bannerId &&
    watch("profileGifId") === data?.profileId &&
    watch("username") === data?.username;

  return (
    <dialog id="update_modal_account" className="modal">
      <div className="modal-box bg-base-300 p-0 rounded-sm">
        {isPending && <Loader2 className="animate-spin" />}
        {isSuccess && (
          <div className="flex flex-col h-full w-full">
            <div className="w-full">
              <GifComponent
                classname="w-full object-cover"
                id={watch("bannerGifId")}
              />
            </div>
            <div className="relative">
              <div className="relative left-5 -top-10 gap-2 items-center w-fit h-fit flex">
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-base-300 ring-offset-base-300 ring-offset-2">
                    <GifComponent
                      classname="object-center"
                      id={watch("profileGifId")}
                    />
                  </div>
                </div>
                <h3 className="mt-4 font-bold text-lg">{data.username}</h3>
              </div>
              <div className="bg-base-100 p-2 m-4 rounded-md flex flex-col gap-4">
                <div>
                  <h6 className="uppercase font-bold text-sm">Banner Gif ID</h6>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-sm border-0 bg-base-200 focus:outline-none focus:bg-base-300 transition-all w-full max-w-xs"
                    {...register("bannerGifId")}
                  />
                </div>
                <div>
                  <h6 className="uppercase font-bold text-sm">
                    Profile Gif ID
                  </h6>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-sm border-0 bg-base-200 focus:outline-none focus:bg-base-300 transition-all w-full max-w-xs"
                    {...register("profileGifId")}
                  />
                </div>
                <SearchGifComponent />
              </div>
              <div className="bg-base-100 p-2 m-4 rounded-md flex flex-col gap-4">
                <div className="flex justify-between">
                  <div>
                    <h6 className="uppercase font-bold text-sm">Username</h6>
                    {value ? (
                      <input
                        type="text"
                        className="rounded-md text-sm font-bold px-2 py-1"
                        {...register("username")}
                      />
                    ) : (
                      <p className="font-semibold text-xs">{data.username}</p>
                    )}
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={toggle}>
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h6 className="uppercase font-bold text-sm">Email</h6>
                  <p className="font-semibold text-xs">
                    {data.email || "no email"}
                  </p>
                </div>
                <div>
                  <h6 className="uppercase font-bold text-sm">Join Since</h6>
                  <p className="font-semibold text-xs">
                    {moment(new Date(data.createdAt)).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div>
                  <h6 className="uppercase font-bold text-sm">Last Updated</h6>
                  <p className="font-semibold text-xs">
                    {moment(new Date(data.updatedAt)).fromNow()}
                  </p>
                </div>
              </div>

              <form
                method="dialog"
                className="w-full flex justify-center gap-2"
              >
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-info w-fit">
                  <Ban /> Cancel
                </button>
                <button
                  className="btn btn-success w-fit"
                  disabled={isNotChange || isSubmitting}
                  onClick={() => onSubmit()}
                >
                  <ClipboardEdit /> Update
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
};
