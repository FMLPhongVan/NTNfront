import { ActionTypes } from "../../ActionTypes";
import { Action, AppThunkAction } from "../../store";

export function setData(
	content: string, 
	postId: number,
): AppThunkAction<Action<object>, unknown> {
	return (dispatch) =>
		dispatch({
			type: ActionTypes.UPDATE_POST__SET_DATA,
			payload: { content: content, postId: postId },
		});
}
