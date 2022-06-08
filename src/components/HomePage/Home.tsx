import { Box, Paper, Stack, styled } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ApplicationState } from "../../store";
import { changeIsNewPostUp } from "../../store/actions/createPost/changeIsNewPostUp";
import NewPostBar from "../Post/CreatePost/NewPostBar";
import NewPostDialog from "../Post/CreatePost/NewPostDialog";
import CreatePost from "../Post/PostAction/CreatePost";
import UpdatePost from "../Post/UpdatePost/UpdatePost";
import UserPost from "../Post/UserPost/UserPost";
import { useStyle } from "./HomeStyle";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
}));

const connector = connect(
	(state: ApplicationState) => ({
		token: state.app.token,
		userId: state.app.userId,
		isNewPostUploaded: state.createPost.isNewPostUploaded,
	}), 
	{
		changeIsNewPostUp,
	}
);

function Home({
	token, 
	isNewPostUploaded,
	changeIsNewPostUp,
}: ConnectedProps<typeof connector>): ReactElement {
	const styles = useStyle();
	const [posts, setPosts] = useState<any>([]);
	const [scrollPos, setScrollPos] = useState(0);
	const [nextPageURL, setNextPageURL] = useState<string | null>("http://127.0.0.1:8000/api/post/get/all?page=1");

	console.log(posts);

	useEffect(() => {
		const authToken = `Bearer ${token}`;
		fetch("http://127.0.0.1:8000/api/post/get/all", {
			method: "GET",
			mode: "cors",
			headers: {
				"Authorization": authToken,
			}
		}).then(res => res.json())
			.then(data => {
				console.log(data);
				setPosts(data.data);
				setScrollPos(0);
				if (data.next_page_url != null) {
					setNextPageURL(data.next_page_url);
				}
			});
	}, [isNewPostUploaded]);

	useEffect(() => {
		const authToken = `Bearer ${token}`;
		if (scrollPos !== 0 && nextPageURL !== null) {
			fetch(`${nextPageURL}`, {
				method: "GET",
				mode: "cors",
				headers: {
					"Authorization": authToken,
				}
			}).then(res => res.json())
				.then(data => {
					setScrollPos(0);
					setPosts([ ...posts, ...data.data]);
					setNextPageURL(data.next_page_url);
				});
		}
	}, [scrollPos]);

	useEffect(() => {
		window.addEventListener("scroll", listenToScroll);
	}, []);

	const listenToScroll = () => {
		const scroll = document.body.scrollTop || document.documentElement.scrollTop;
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrolled = scroll / height;

		if (scrolled > 0.9 && scrolled < 1 && Math.trunc(scrolled * 10) !== scrollPos) {
			setScrollPos(Math.trunc(scrolled * 10));
		}
	};

	return (
		<Box>
			<Box>
				<Stack spacing={2} sx={{ mt: 2 }}>
					<div><NewPostBar /></div>
					{
						posts.map((post: any, index: number) => {
							return (
								<div key={index}>
									<UserPost 
										userId={post.user_id} 
										content={post.content} 
										image={post.image} 
										postId={post.id} 
										user={post.user}
										profile={post.profile}
										comments={post.comments} 
										tags={post.tags} 
										likes={post.likes} 
										createdAt={post.created_at}								
									/>
								</div>
							);
						})
					}
				</Stack>
				<NewPostDialog />
				<UpdatePost />
			</Box>
		</Box>
	);
}

export default connector(Home);