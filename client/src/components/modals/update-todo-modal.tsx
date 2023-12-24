import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ban, ClipboardEdit } from "lucide-react";
import { CreateTodoRequest } from "../../../types";
import todoApi from "../../api/todo-api";
import { useCookies } from "react-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect } from "react";
import { useDefaultModalValueStore } from "../../hooks/use-default-value-modal";
import { toast } from "react-toastify";
import useTheme from "../../hooks/use-theme";

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
});

export default function UpdateTodoModal() {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["token"]);
  const { isDarkVariant } = useTheme();
  const {
    titleDefaultvalue,
    descriptionDefaultValue,
    categoryDefaultValue,
    todoIdDefaultValue,
    clearState,
  } = useDefaultModalValueStore();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
    reset,
    setValue,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: titleDefaultvalue,
      description: descriptionDefaultValue,
      category: categoryDefaultValue,
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: (newTodo: CreateTodoRequest) =>
      todoApi.updateTodo(cookies.token, todoIdDefaultValue, newTodo),
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getAllTodos"],
        }),
        queryClient.invalidateQueries({ queryKey: ["getUsersAdminSettings"] }),
        queryClient.invalidateQueries({ queryKey: ["getUsersDashboard"] }),
      ]),
    onSuccess: (data) => {
      toast.success(
        data.data.message,
        {
          delay: 1500,
          theme: isDarkVariant ? "dark" : "light",
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      reset({ category: "", description: "", title: "" });
      clearState();
    },
    mutationKey: ["updateTodo"],
  });

  const onSubmit = handleSubmit((formData) => {
    updateTodoMutation.mutate({
      title: formData.title,
      description: formData.description,
      category: formData.category,
    });
  });

  useEffect(() => {
    setValue("title", titleDefaultvalue);
    setValue("description", descriptionDefaultValue);
    setValue("category", categoryDefaultValue);
  }, [
    titleDefaultvalue,
    descriptionDefaultValue,
    categoryDefaultValue,
    setValue,
  ]);

  return (
    <dialog
      id="update_modal_todo"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box flex flex-col justify-center items-center">
        <h3 className="font-bold text-lg text-center mb-4">Update Your ToDo</h3>
        <div className="form-control w-full max-w-xs">
          <div>
            <label className="label">
              <span className="label-text font-semibold">
                Want to change the Todo title?
              </span>
            </label>
            <input
              type="text"
              placeholder="task name..."
              className="input input-ghost bg-base-200 w-full max-w-xs"
              {...register("title")}
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">
                Want to change the Todo Description?
              </span>
            </label>
            <textarea
              className="textarea resize-none bg-base-200 textarea-ghost w-full h-24"
              placeholder="task description..."
              {...register("description")}
            ></textarea>
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">
                Want to change the Type of Todo?
              </span>
            </label>
            <select
              {...register("category")}
              className="select select-ghost bg-base-200 w-full max-w-xs"
            >
              <option value="WORK">Work</option>
              <option value="PERSONAL">Personal</option>
              <option value="SHOPPING">Shopping</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" className="w-full flex justify-center gap-2">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-info w-fit"
              onClick={() => {
                reset({ category: "", description: "", title: "" });
                clearState();
              }}
            >
              <Ban /> Cancel
            </button>
            <button
              className="btn btn-success w-fit"
              disabled={!isDirty || isSubmitting}
              onClick={() => onSubmit()}
            >
              <ClipboardEdit /> Update
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
