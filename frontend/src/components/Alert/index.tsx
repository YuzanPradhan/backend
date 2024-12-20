import { toast, ToastOptions } from "react-toastify";

type AlertType = "success" | "info" | "warning" | "error";

const Alert = (type: AlertType = "error", message = "") => {
  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  return toast[type](message, toastOptions);
};

export default Alert;
