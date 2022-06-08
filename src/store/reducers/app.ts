import { AnyAction } from "@reduxjs/toolkit";
import { ActionTypes } from "./../ActionTypes";

enum Time {
	ONE_MIN = 60 * 1000,
	ONE_HOUR = 60 * 60 * 1000,
	ONE_DAY = 24 * 60 * 60 * 1000,
}

export type AppState = {
    token: string;
	userId: number;
	username: string;
	isLoggedIn: boolean;
	openLostConnectAlert: boolean;
	mainPagePath: string;
};

export const inititalState: AppState = {
	token: "",
	userId: 0,
	username: "",
	isLoggedIn: false, 
	openLostConnectAlert: false,
	mainPagePath: "/home",
};

async function getUserData(token: string) {
	const authToken = `Bearer ${token}`;
	return await fetch("http://127.0.0.1:8000/api/user", {
		method: "GET",
		mode: "cors",
		headers: {
			"Authorization": authToken,
		}
	}).then(res => res.json());
}

async function getProfileData(token: string, userId: number) {
	const authToken = `Bearer ${token}`;
	return await fetch(`http://127.0.0.1:8000/api/profile/get/${userId}`, {
		method: "GET",
		mode: "cors",
		headers: {
			"Authorization": authToken,
		}
	}).then(res => res.json());
}

export function reduce(
	state: AppState = inititalState,
	action: AnyAction,
):  AppState {
	switch (action.type) {
	case ActionTypes.APP__CHANGE_OPEN_LOST_CONNECT_ALERT:
		return { ...state, openLostConnectAlert: action.payload };
	
	case ActionTypes.APP__SAVE_USER_DATA_IN_COOKIES: {
		const expireDate = new Date(new Date().getTime() + Time.ONE_HOUR).toUTCString();
		if (document.cookie === "") 
			document.cookie = `token=${action.payload.token}; SameSite=Strict; expires=${expireDate};`;
			
		return {
			...state,
			userId: action.payload.userId,
			username: action.payload.username,
			token: action.payload.token,
			isLoggedIn: true,
		};
	}

	case ActionTypes.APP__FIND_USER_DATA_IN_COOKIES: {
		if (document.cookie === "") 
			return state;
		else {
			const tmpToken = document.cookie.replace("token=", "");
			const authToken = `Bearer ${tmpToken}`;
			let userData = { id: 0, username: "" };
			fetch("http://127.0.0.1:8000/api/user", {
				method: "GET",
				mode: "cors",
				headers: {
					"Authorization": authToken,
				}
			}).then(res => res.json())
				.then(data => {
					userData = data;
				});
			return {
				...state,
				token: tmpToken,
				userId: userData.id,
				username: userData.username,
				isLoggedIn: true,
			};
		}
	}

	case ActionTypes.APP__LOGOUT_AND_DELETE_COOKIES: {
		const expireDate = new Date(0).toUTCString();
		document.cookie = `token=${state.token}; SameSite=Strict; expires=${expireDate};`;
		return {
			...state,
			token: "",
			userId: 0,
			username: "",
			isLoggedIn: false,
		};
	}

	case ActionTypes.APP__SAVE_URL_AFTER_RELOAD: 
		return { ...state, mainPagePath: action.payload };

	default: 
		return state;
	}
}