import { toast } from "react-toastify";

const ShowSuccess = (message) => {
    toast.success(message)
}

const ShowInfo = (message) => {
    toast.info(message)
}

const ShowWarning = (message) => {
    toast.warn(message)
}

const ShowError = (message) => {
    toast.error(message)
}

export const Notify = {
    ShowSuccess,
    ShowInfo,
    ShowWarning,
    ShowError
}