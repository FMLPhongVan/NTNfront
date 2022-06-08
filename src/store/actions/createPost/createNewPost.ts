import { DialogContentType } from "./../../../components/MasterDialog/DialogContent";
import { Hashtag } from "../../../components/Post/CreatePost/NewPostDialog";
import { ActionTypes } from "../../ActionTypes";
import { Action, AppThunkAction } from "../../store";

interface PostData {
	token: string;
    content: string;
    tags: Hashtag[];
    image: any;
}

export function createNewPost(
	postData: PostData,
) {
	const authToken = `Bearer ${postData.token}`;
	const formData = new FormData();
	formData.append("content", postData.content);
	postData.tags.map((tag, index) => {
		formData.append(`tags[${index}]`, `${tag.label}`);
	});
	if (postData.image !== null) {
		formData.append("image", postData.image);
	}

	return fetch("http://127.0.0.1:8000/api/post/create", {
		method: "POST",
		mode: "cors",
		headers: {
			"Accept": "application/json",
			"Authorization": authToken,
		},
		body: formData,
	}).then(res => res.json());
}