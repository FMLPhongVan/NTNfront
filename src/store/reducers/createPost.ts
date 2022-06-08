import { AnyAction } from "@reduxjs/toolkit";
import { ActionTypes } from "./../ActionTypes";

export type CreatePostState = {
	openNewPostDialog: boolean;
	isNewPostUploaded: boolean;
	sendStatus: number;
};

export const inititalState: CreatePostState = {
	openNewPostDialog: false,
	isNewPostUploaded: false,
	sendStatus: -1,
};

export function reduce(
	state: CreatePostState = inititalState,
	action: AnyAction,
):  CreatePostState {
	switch (action.type) {
	case ActionTypes.CREATE_POST__CHANGE_OPEN_STATE: 
		return { ...state, openNewPostDialog: action.payload };
		
	case ActionTypes.CREATE_POST__CREATE_NEW_POST:
		return { ...state, sendStatus: action.payload };

	case ActionTypes.CREATE_POST__CHANGE_IS_NEW_POST_UP:
		return { ...state, isNewPostUploaded: !state.isNewPostUploaded };

	default: 
		return state;
	}
}