import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { ActionTypes } from "./ActionTypes";

import { reduce as appReducer, inititalState as appIS } from "./reducers/app";
import { reduce as createPostReducer, inititalState as createPostIS } from "./reducers/createPost"; 
import { reduce as masterDialogReducer, inititalState as masterDialogIS} from "./reducers/masterDialog";
import { reduce as updatePostReducer, inititalState as updatePostIS } from "./reducers/updatePost";

const store = configureStore({
	reducer: {
		app: appReducer,
		createPost: createPostReducer,
		masterDialog: masterDialogReducer,
		updatePost: updatePostReducer,
	},
	preloadedState: {
		app: appIS,
		createPost: createPostIS,
		masterDialog: masterDialogIS,
		updatePost: updatePostIS,
	},
	middleware(getDefaultMiddleware) {
		return [
			...getDefaultMiddleware({
				serializableCheck: false,
			}), 
			thunk
		];
	},
	devTools: process.env.NODE_ENV === "development",
});

export type ApplicationState = ReturnType<typeof store.getState>;
export type GetState = () => ApplicationState;
export type Action<PayloadType> = {
  type: ActionTypes;
  payload: PayloadType;
};

export interface AppThunkAction<TAction, TResult = void> {
  (dispatch: (action: TAction) => void, getState: GetState):
    | TResult
    | PromiseLike<TResult>;
}

export default store;
