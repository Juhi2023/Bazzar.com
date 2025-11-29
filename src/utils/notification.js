import toast from "react-hot-toast";

export const NOTIFICATION_TYPE_INFO = 'info';
export const NOTIFICATION_TYPE_SUCCESS = 'success';
export const NOTIFICATION_TYPE_WARNING = 'warning';
export const NOTIFICATION_TYPE_ERROR = 'error';

export const notify = (type, message) => {
  toast.dismiss();
  switch (type) {
    case NOTIFICATION_TYPE_INFO:
      toast(message, {
        position: 'bottom-center',
        style: {
          backgroundColor: "black",
          color: "white",
          fontSize: "13px"
        }
      });
      break;
    case NOTIFICATION_TYPE_SUCCESS:
      toast.success(message, {
        position: 'bottom-center',
        style: {
          backgroundColor: "black",
          color: "white",
          fontSize: "13px"
        }
      });
      break;
    case NOTIFICATION_TYPE_WARNING:
      toast.error(message, {
        position: 'bottom-center',
        style: {
          backgroundColor: "black",
          color: "white",
          fontSize: "13px"
        }
      });
      break;
    case NOTIFICATION_TYPE_ERROR:
      toast.error(message, {
        position: 'bottom-center',
        style: {
          backgroundColor: "black",
          color: "white",
          fontSize: "13px"
        }
      });
      break;
    default:
  }
}