import { AnyAction } from "@reduxjs/toolkit";
import { ActionTypes } from "./../ActionTypes";

export type UpdatePostState = {
	openUpdatePostDialog: boolean;
	content: string;
	postId: number;
};

export const inititalState: UpdatePostState = {
	openUpdatePostDialog: false,
	content: "",
	postId: 0,
};

export function reduce(
	state: UpdatePostState = inititalState,
	action: AnyAction,
):  UpdatePostState {
	switch (action.type) {
	case ActionTypes.UPDATE_POST__CHANGE_OPEN_STATE: 
		return { ...state, openUpdatePostDialog: action.payload };
		
	case ActionTypes.UPDATE_POST__SET_DATA:
		return { ...state, content: action.payload.content, postId: action.payload.postId};

	default: 
		return state;
	}
}