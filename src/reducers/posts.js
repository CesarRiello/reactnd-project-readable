export const POST_ADD = 'POST_ADD';
export const POST_EDIT = 'POST_EDIT';
export const POST_DELETE = 'POST_DELETE';
export const POST_SET_SCORE = 'POST_SET_SCORE';

export default function posts(state = [], action){

	const {
		type,
		posts,
		postId,
		commentTotal,
		voteScore,
		title,
		body
	} = action;

	switch ( type ){

		case POST_ADD:
			// only adds posts that aren't already on the state and not deleted
			let newAddPost = state.slice();
			posts.forEach((post) => {
				let exists = state.find((pos) => pos.id === post.id) ? true : false;
				if ( !exists && !post.deleted ){
					newAddPost.push(post);
				}
			});
			return newAddPost;

		case Types.ADD_COMMENT_TOTAL:
			let newCountPost = state.map((post) => {
				if ( post.id === postId ){
					return {
						...post,
						commentTotal
					}
				}
				return post
			});
			return newCountPost;

		case POST_SET_SCORE:
			let newState = state.map((post) => {
				if ( post.id === postId ) {
					return {
						...post,
						voteScore
					}
				}
				return post
			});
			return newState;

		case POST_EDIT:
			let newEditPost = state.map((post) => {
				if ( post.id === postId ){
					return {
						...post,
						title,
						body,
					}
				}
				return post
			});
			return newEditPost;

		case POST_DELETE:
			let newDelPost = state.map((post) => {
				if ( post.id === postId ) {
					return {
						...post,
						deleted: true
					}
				}
				return post
			});
			return newDelPost;

		case Types.RESET_POSTS:
			return [];

		default:
			return state

	}
}