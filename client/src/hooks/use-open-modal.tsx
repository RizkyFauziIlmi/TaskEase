enum ModalType {
  TODO,
  ACCOUNT,
  FRIEND
}

enum ModalMethod {
  CREATE,
  UPDATE,
}

/**
 * A custom hook for opening different modals.
 *
 * @returns {object} An object containing the modal types, modal methods, and the openModal function.
 */
const useOpenModal = () => {
  /**
   * Opens a modal based on the given modalType and modalMethod.
   *
   * @param {ModalType} modalType - The type of modal to open.
   * @param {ModalMethod} modalMethod - The method of the modal to open.
   */
  const openModal = (modalType: ModalType, modalMethod: ModalMethod) => {
    // CREATE TODO MODAL
    if (modalType === ModalType.TODO && modalMethod === ModalMethod.CREATE) {
      const dialog = document.getElementById(
        "create_modal_todo"
      ) as HTMLDialogElement;
      document;

      dialog?.showModal();
    }

    // UPDATE TODO MODAL
    if (modalType === ModalType.TODO && modalMethod === ModalMethod.UPDATE) {
      const dialog = document.getElementById(
        "update_modal_todo"
      ) as HTMLDialogElement;
      document;

      dialog?.showModal();
    }

    if (modalType === ModalType.ACCOUNT && modalMethod === ModalMethod.UPDATE) {
      const dialog = document.getElementById(
        "update_modal_account"
      ) as HTMLDialogElement;
      document;

      dialog?.showModal();
    }

    if (modalType === ModalType.FRIEND && modalMethod === ModalMethod.CREATE) {
      const dialog = document.getElementById(
        "add_friend_modal"
      ) as HTMLDialogElement;
      document;

      dialog?.showModal();
    }
  };

  return { ModalMethod, ModalType, openModal };
};

export default useOpenModal;
