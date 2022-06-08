import { ActionTypes } from "../../ActionTypes";
import { Action, AppThunkAction } from "../../store";

export function saveUserDataInCookies(
	userData: object,
): AppThunkAction<Action<object>, unknown> {
	return (dispatch) =>
		dispatch({
			type: ActionTypes.APP__SAVE_USER_DATA_IN_COOKIES,
			payload: userData,
		});
}
