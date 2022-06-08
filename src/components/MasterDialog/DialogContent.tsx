import ErrorDialog from "./ErrorDialog/ErrorDialog";
import SuccessDialog from "./SuccessDialog/SuccessDialog";

export enum DialogContentType {
    NONE = 0,
    // CONFIRM_DIALOG = 1,
    SUCCESS_DIALOG = 2,
    ERROR_DIALOG = 3,
    // WARN_DIALOG = 4,
    //NOTIFY_DIALOG = 5,
}
  
export const DialogContents = {
	[DialogContentType.NONE]: <></>,
	[DialogContentType.SUCCESS_DIALOG]: <SuccessDialog />,
	[DialogContentType.ERROR_DIALOG]: <ErrorDialog />,
};