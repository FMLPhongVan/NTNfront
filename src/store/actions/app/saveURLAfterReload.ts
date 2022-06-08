import { ActionTypes } from "../../ActionTypes";
import { Action, AppThunkAction } from "../../store";

export function saveURLAfterReload(
	url: string,
): AppThunkAction<Action<string>, unknown> {
	return (dispatch) =>
		dispatch({
			type: ActionTypes.APP__SAVE_URL_AFTER_RELOAD,
			payload: url,
		});
}
