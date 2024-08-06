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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded">{children}</div>
          <button
            className="mt-4 bg-blue-800 py-2 px-4 text-white rounded"
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
