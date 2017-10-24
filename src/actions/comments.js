/**
 * index.js action creatores for posts
 */

import * as Types from './types.js';

/* api */
import * as API from '../utils/API'


/**
 * addComments action creator
 */
export function addComments( comments ){
	return {
		type: Types.ADD_COMMENTS,
		comments
	}
}
/* Thunk with API call to add post on the server */
export function sendComment(comment, dispatch){
	return API.newComment(comment)
	.then((comment) => {
		// addPosts action must receive an array
		dispatch(addComments([comment]))
	})
}


/**
 * updateCommentScore action creator
 */
export function updateCommentScore({commentId, voteScore}){
	return {
		type: Types.UPDATE_COMMENT_SCORE,
		commentId,
		voteScore
	}
}
export function sendCommentVote({commentId, vote}, dispatch){
	return API.voteComment(commentId, vote)
	.then((json) => {
		dispatch(updateCommentScore({
			commentId,
			voteScore: json.voteScore
		}))
	});
}

/**
 * editComment action creator
 */
export function editComment({ commentId, timestamp, body }){
	return {
		type: Types.EDIT_COMMENT,
		commentId,
		timestamp,
		body,
	}
}
export function updateComment(edits, dispatch){
	return API.editComment(edits)
	.then(() => {
		dispatch( editComment(edits) )
	})
}


/**
 * deleteComment action creator
 */
export function deleteComment( commentId ){
	return {
		type: Types.DELETE_COMMENT,
		commentId
	}
}
export function eraseComment(commentId, dispatch){
	return API.deleteComment(commentId)
	.then((status) => {
		if ( status ){
			dispatch( deleteComment(commentId) )
		}
	});
}


/**
 * deleteCommentFromParent action creator
 */
export function deleteCommentFromParent( parentId ){
	return {
		type: Types.DELETE_COMMENT,
		parentId
	}
}