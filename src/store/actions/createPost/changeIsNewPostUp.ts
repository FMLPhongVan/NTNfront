import { ActionTypes } from "../../ActionTypes";
import { Action, AppThunkAction } from "../../store";

export function changeIsNewPostUp(
	isUploaded: boolean
): AppThunkAction<Action<boolean>, unknown> {
	return (dispatch) =>
		dispatch({
			type: ActionTypes.CREATE_POST__CHANGE_IS_NEW_POST_UP,
			payload: isUploaded,
		});
}
