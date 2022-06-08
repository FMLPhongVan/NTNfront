import { ActionTypes } from "../../ActionTypes";
import { Action, AppThunkAction } from "../../store";

export function logoutAndDeleteCookies(): AppThunkAction<Action<undefined>, unknown> {
	return (dispatch) =>
		dispatch({
			type: ActionTypes.APP__LOGOUT_AND_DELETE_COOKIES,
			payload: undefined,
		});
}
