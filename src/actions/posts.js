/**
 * index.js action creatores for posts
 */
import * as Types from './types';

import { addComments, deleteCommentFromParent } from './comments'

/* api */
import * as API from '../utils/API'


/**
 * addCategories action creator
 */
export function addCategories(categories){
	return {
		type: Types.ADD_CATEGORIES,
		categories
	}
}
/**
 * Thunk with API call to get categories from the server
 */
export function fetchCategories(dispatch){
	API.getCategories()
	.then((json) => dispatch( addCategories(json.categories) ))
}


/**
 * addPosts action creator
 * @param post {Array} - array of one or posts to be added to the store
 */
export function addPosts( posts ){
	return {
		type: Types.ADD_POSTS,
		posts
	}
}
/**
 * addCommentTotal action creator
 */
export function addCommentTotal({postId, commentTotal}){
	return {
		type: Types.ADD_COMMENT_TOTAL,
		postId,
		commentTotal
	}
}
/**
 * Thunk with API call to get all posts from the server
 */
export function fetchPosts(dispatch){
	API.getPosts()
	.then((posts) => dispatch( addPosts(posts) ))
	.then((action) => {
		const { posts } = action
		posts.forEach(post => {
			// when it's done, fetch the comment total for each post	
			// if post it's not deleted or already have their comment total
			if ( !post.commentTotal && !post.deleted ){
				fetchCommentTotal(post.id, dispatch)
			}
		})
	})
}


export function fetchCommentTotal(id, dispatch){
	API.getCommentsByPost(id)
	.then((json) => {
		dispatch(addCommentTotal({
			postId: id,
			commentTotal: json.length
		}))
	})
}

/**
 * Thunk with API call to get a single post data
 */
export function fetchPostDetail(id, dispatch){
	API.getPostDetail(id)
	.then((post) => {
		if (post.id){
			dispatch( addPosts([post]) )
		}
	})
	.then(() => fetchCommentTotal(id, dispatch))
	.then(() => {
		// when it's done, fetch the commments for the post
		API.getCommentsByPost(id)
		.then((comments) => {
			dispatch(addComments(comments))
		});
	})
}


/**
 * updatePostScore action creator
 */
export function updatePostScore({postId, voteScore}){
	return {
		type: Types.UPDATE_POST_SCORE,
		postId,
		voteScore
	}
}
/* Thunk with API call to send vote to the server */
export function sendVote({postId, vote}, dispatch){
	// updates data on the server
	API.votePost(postId, vote)
	.then((updated) => {
		const { id, voteScore } = updated
		dispatch( updatePostScore({
			postId: id,
			voteScore
		}))
	});
}


/**
 * editPost action creator
 */
export function editPost({ postId, title, body }){
	return {
		type: Types.EDIT_POST,
		postId,
		title,
		body
	}
}
/* Thunk with API call to update post on the server */
export function sendUpdate(edits, dispatch){
	return API.editPost(edits)
	.then((json) => {
		const { id, title, body } = json
		dispatch(editPost({
			postId: id,
			title,
			body
		}))
	})
}

/* Thunk with API call to add post on the server */
export function sendPost(post, dispatch){
	return API.newPost(post)
	.then((post) => {
		// addPosts action must receive an array
		dispatch(addPosts([post]))
	})
}

/**
 * deletePost action creator
 */
export function deletePost( postId ){
	return {
		type: Types.DELETE_POST,
		postId
	}
}
/* Thunk with API call to erase post on the server */
export function erasePost( postId, dispatch ){
	return API.deletePost(postId)
	.then((status) => {
		if (status) {
			dispatch( deletePost(postId) )
			dispatch( deleteCommentFromParent(postId) )
		}
	})
}


/**
 * resetPosts action creator
 */
export function resetPosts(){
	return {
		type: Types.RESET_POSTS
	}
}