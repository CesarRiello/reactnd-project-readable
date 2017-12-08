import {
  getComments,
  postComment,
  putComment,
  postVoteComment,
  deleteComment
} from 'utils/api'

export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const editComment = (comment) => {
  return dispatch => {
    putComment(comment).then(response => {
      dispatch({ type: EDIT_COMMENT, comment: response.data })
    })
  }
}

export const fetchComments = postId => {
  if (postId) {
    return dispatch => {
      getComments(postId).then(response => {
        dispatch({ type: FETCH_COMMENTS, comments: (response.data || []).sort(() => ('-voteScore')) })
      })
    }
  }
}

export const addComment = data => {
  return dispatch => {
    postComment(data).then(response => {
      dispatch({ type: ADD_COMMENT, comment: response.data })
    })
  }
}

export const voteComment = ({ id, vote }) => {
  return dispatch => {
    postVoteComment({ id, vote }).then(response => {
      dispatch({ type: VOTE_COMMENT, comment: response.data })
    })
  }
}

export const removeComment = (id) => {
  return dispatch => {
    deleteComment({ id }).then(response => {
      console.log('removeComment', response);
      dispatch({ type: DELETE_COMMENT, comment: response.data })
    })
  }
}
