import { PlusIcon } from "lucide-react";
import CreateTodoModal from "./modals/create-todo-modal";
import useOpenModal from "../hooks/use-open-modal";
import { SidebarMenu } from "./sidebar-menu";
import { useDefaultModalValueStore } from "../hooks/use-default-value-modal";

export default function TodoHeaderComponent() {
  const { ModalMethod, ModalType, openModal } = useOpenModal();
  const { categoryDefaultValue } = useDefaultModalValueStore();

  return (
    <div className="bg-base-300 shadow-sm h-[10%] md:h-[20%] flex px-4 items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarMenu />
        <h1 className="font-bold text-xl">ToDo</h1>
      </div>
      <button
        className="btn btn-circle btn-outline btn-sm"
        onClick={() => openModal(ModalType.TODO, ModalMethod.CREATE)}
      >
        <PlusIcon />
      </button>
      <CreateTodoModal defaultValueCategory={categoryDefaultValue} />
    </div>
  );
}
