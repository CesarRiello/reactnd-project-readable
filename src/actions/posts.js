import {
  getPosts,
  getPostsByCategory,
  getPost,
  putPost,
  postPost,
  postVote,
  deletePost
} from "../utils/Rest"

export const FETCH_POSTS = "FETCH_POSTS"
export const ADD_POST = "ADD_POST"
export const VOTE_POST = "VOTE_POST"
export const FETCH_POST = "FETCH_POST"
export const EDIT_POST = "EDIT_POST"
export const DELETE_POST = "DELETE_POST"

export const fetchPosts = () => {
  return dispatch => {
    getPosts().then(response => {
      dispatch({ type: FETCH_POSTS, posts: response.data })
    })
  }
}

export const fetchPostsByCategory = category => {
  return dispatch => {
    getPostsByCategory(category).then(response => {
      dispatch({ type: FETCH_POSTS, posts: response.data })
    })
  }
}

export const fetchPost = postId => {
  if (postId) {
    return dispatch => {
      getPost(postId).then(response => {
        dispatch({ type: FETCH_POST, post: response.data })
      })
    }
  }
}

export const rankPost = ({ postId, vote }) => {
  return dispatch => {
    postVote({ postId, vote }).then(response => {
      dispatch({ type: VOTE_POST, post: response.data })
    })
  }
}

export const removePost = ({ postId, category = "" }) => {
  return dispatch => {
    deletePost({ postId }).then(response => {
      dispatch({ type: DELETE_POST, post: response.data })
      alert("Post deleted")
    })
  }
}

export const addPost = post => {
  if (post) {
    return dispatch => {
      postPost(post).then(response => {
        dispatch({ type: ADD_POST, post: response.data })
        alert("Post created")
      })
    }
  }
}

export const editPost = (post, id) => {
  if (post) {
    post.id = id
    return dispatch => {
      putPost(post).then(response => {
        dispatch({ type: EDIT_POST, post: response.data })
        alert("Post edited")
      })
    }
  }
}
