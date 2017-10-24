export const COMMENT_ADD = 'COMMENT_ADD';
export const COMMENT_EDIT = 'COMMENT_EDIT';
export const COMMENT_DELETE = 'COMMENT_DELETE';
export const COMMENT_POST_DELETE = 'COMMENT_POST_DELETE';
export const COMMENT_SET_SCORE = 'COMMENT_SET_SCORE';

export default function comments(state = [], action) {

	const {
		type, 
		comments, 
		commentId, 
		parentId, 
		timestamp, 
		body, 
		voteScore
	} = action;

	switch (type) {

		case COMMENT_ADD:
			let newAddState = state.slice();
			comments.forEach((comment) => {
				let exists = state.find((com) => com.id === comment.id) ? true : false;
				if (!exists && !comment.deleted) {
					newAddState.push(comment);
				}
			});
			return newAddState;

		case COMMENT_EDIT:
			let newEditState = state.map((comment) => {
				if (comment.id === commentId) {
					return {
						...comment,
						timestamp,
						body,
					}
				}
				return comment
			});
			return newEditState;


		case COMMENT_DELETE:
			let newDelState = state.map((comment) => {
				if (comment.id === commentId) {
					return {
						...comment,
						deleted: true
					}
				}
				return comment
			});
			return newDelState;

		case COMMENT_POST_DELETE:
			let newDelParentState = state.map((comment) => {
				if (comment.parentId === parentId) {
					return {
						...comment,
						deleted: true
					}
				}
				return comment
			});
			return newDelParentState;

		case COMMENT_SET_SCORE:
			let newUpState = state.map((comment) => {
				if (comment.id === commentId) {
					return {
						...comment,
						voteScore
					}
				}
				return comment
			});
			return newUpState;

		default:
			return state;

	}

}