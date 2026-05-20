import { Notify } from "./Notify";

export const ErrorHandler = (error) => {
    let errMsg = "Something went wrong!";
    
    if (error?.response?.data?.msg) {
        errMsg = error.response.data.msg;
    }

    Notify.ShowError(errMsg);
};