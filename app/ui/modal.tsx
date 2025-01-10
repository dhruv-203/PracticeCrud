"use client";
import { useRouter } from "next/navigation";
import { ComponentRef, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ComponentRef<"dialog">>(null);
  useEffect(() => {
    if (!dialogRef.current?.open) {
      console.log("Opening the modal");
      dialogRef.current?.showModal();
      console.log(dialogRef.current?.open);
    }
  }, []);

  function closeModal() {
    router.back();
  }

  return createPortal(
    <div className="backdrop bg-black/50 fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <dialog
        ref={dialogRef}
        className="modal relative bg-white w-full md:w-3/5 lg:w-2/5  rounded-lg p-4 shadow-lg flex items-center justify-center gap-4"
        onClose={closeModal}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </dialog>
    </div>,
    document.getElementById("modal-root") as Element
  );
}

export default Modal;
