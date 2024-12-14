import { useEffect } from "react";
import PropTypes from "prop-types";

function PopupMessage({ message, type = "success", isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose(); // Menutup popup setelah durasi selesai
      }, 2000); // Delay 2 detik
      return () => clearTimeout(timer); // Bersihkan timer saat komponen di-unmount
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed z-9999 top-10 right-10 p-4 rounded-lg shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
      style={{ zIndex: 9999 }} 
    > 
      {message}
    </div>
  );
}

PopupMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string, // `type` has a default value of "success"
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopupMessage;
