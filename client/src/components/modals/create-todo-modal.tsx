import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ban, PlusCircle } from "lucide-react";
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

interface CreateTodoModalProps {
  defaultValueCategory?: string;
}

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
});

export default function CreateTodoModal({
  defaultValueCategory = "",
}: CreateTodoModalProps) {
  const [cookies] = useCookies(["token"]);
  const queryClient = useQueryClient();
  const { clearState } = useDefaultModalValueStore();
  const { isDarkVariant } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
    reset,
    setValue,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: defaultValueCategory,
    },
  });

  useEffect(() => {
    setValue("category", defaultValueCategory);
  }, [defaultValueCategory, setValue]);

  const createTodoMutation = useMutation({
    mutationFn: (newTodo: CreateTodoRequest) =>
      todoApi.createTodo(cookies.token, newTodo),
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getAllTodos"],
        }),
        queryClient.invalidateQueries({ queryKey: ["getUsersAdminSettings"] }),
        queryClient.invalidateQueries({ queryKey: ["getUsersDashboard"] }),
      ]),
    onSuccess: (data) => {
      toast.success(data.data.message, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      clearState();
    },
    mutationKey: ["createTodo"],
  });

  const createTodo = (title: string, description: string, category: string) => {
    createTodoMutation.mutate({
      title,
      description,
      category,
    });
  };

  const onSubmit = handleSubmit((formData) => {
    createTodo(formData.title, formData.description, formData.category);
    reset({ category: "", description: "", title: "" });
  });

  return (
    <dialog
      id="create_modal_todo"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box flex flex-col justify-center items-center">
        <h3 className="font-bold text-lg text-center mb-4">
          Create Your own ToDo
        </h3>
        <div className="form-control w-full max-w-xs">
          <div>
            <label className="label">
              <span className="label-text font-semibold">
                What is title Todo?
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
                Your Todo Description
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
                Pick the type of Todo
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
            <button className="btn btn-info w-fit">
              <Ban /> Cancel
            </button>
            <button
              className="btn btn-success w-fit"
              disabled={!isDirty || isSubmitting}
              onClick={onSubmit}
            >
              <PlusCircle /> Create
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
