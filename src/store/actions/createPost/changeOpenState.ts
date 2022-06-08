import { ActionTypes } from "../../ActionTypes";
import { Action, AppThunkAction } from "../../store";

export function changeOpenState(
	open: boolean
): AppThunkAction<Action<boolean>, unknown> {
	return (dispatch) =>
		dispatch({
			type: ActionTypes.CREATE_POST__CHANGE_OPEN_STATE,
			payload: open,
		});
}
