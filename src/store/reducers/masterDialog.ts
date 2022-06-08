import { DialogContentType } from "./../../components/MasterDialog/DialogContent";
import { AnyAction } from "@reduxjs/toolkit";
import { ActionTypes } from "./../ActionTypes";
import { changeOpenState } from "../actions/masterDialog/changeOpenState";

export type MasterDialogState = {
	contentType: DialogContentType;
	title: string;
	content: string;
	openState: boolean;
	closeMethod: (reason: "backdropClick" | "escapeKeyDown") => void;
};

export const inititalState: MasterDialogState = {
	contentType: DialogContentType.NONE,
	title: "",
	content: "",
	openState: false,
	closeMethod: (reason) => changeOpenState(false),
};

export function reduce(
	state: MasterDialogState = inititalState,
	action: AnyAction,
):  MasterDialogState {
	switch (action.type) {
	case ActionTypes.MASTER_DIALOG__CHANGE_OPEN_STATE: 
		return { 
			...state, 
			openState: action.payload.open, 
			contentType: action.payload.type, 
			closeMethod: action.payload.closeMethod 
		};
	
	case ActionTypes.MASTER_DIALOG__SET_DIALOG_CONTENT:
		return { ...state, title: action.payload.title, content: action.payload.content };

	default: 
		return state;
	}
}