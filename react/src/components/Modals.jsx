import { useEffect, useState } from "react";

export const Modals = ({ open, onClose, children }) => {
  const [scrollbarNeeded, setScrollbarNeeded] = useState(false);

 const handleClose = (e) => {
  if(e.target.id === 'wrapper') onClose()
 }

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center backdrop-blur-sm items-center overflow-hidden transition-colors transform  ${
        open ? "visible bg-black/50" : "invisible"
      }`}
      id="wrapper"
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-lg shadow p-6 transition-all max-w-[90%] ${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </button>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};