import { ActionTypes } from "../../ActionTypes";
import { Action, AppThunkAction } from "../../store";

export function setDialogContent(title: string, content: string): AppThunkAction<Action<object>, unknown> {
	return (dispatch) =>
		dispatch({
			type: ActionTypes.MASTER_DIALOG__SET_DIALOG_CONTENT,
			payload: {
				title: title,
				content: content,
			},
		});
}
