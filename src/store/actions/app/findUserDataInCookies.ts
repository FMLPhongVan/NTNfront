import { ActionTypes } from "../../ActionTypes";
import { Action, AppThunkAction } from "../../store";

export function findUserDataInCookies(): AppThunkAction<Action<undefined>, unknown> {
	return (dispatch) =>
		dispatch({
			type: ActionTypes.APP__FIND_USER_DATA_IN_COOKIES,
			payload: undefined,
		});
}
