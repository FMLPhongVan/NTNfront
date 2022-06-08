import { ActionTypes } from "../../ActionTypes";
import { Action, AppThunkAction } from "../../store";

export function changeOpenLostConnectAlert(
	openLostConnectAlert: boolean,
): AppThunkAction<Action<boolean>, unknown> {
	return (dispatch) =>
		dispatch({
			type: ActionTypes.APP__CHANGE_OPEN_LOST_CONNECT_ALERT,
			payload: openLostConnectAlert,
		});
}
