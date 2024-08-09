import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const PortalModal = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted && isOpen
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-70 z-50 p-60 grid gap-4">
          <div className="bg-white p-4 rounded grid grid-cols-5 flex-row gap-4 grid-rows-1 mx-auto">
            {children}
          </div>
          <button
            className="mt-4 bg-blue-800 py-2 px-4 text-white rounded mx-auto"
            onClick={onClose}
          >
            Close
          </button>
        </div>,
        document.body,
      )
    : null;
};

export default PortalModal;
