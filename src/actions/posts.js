import {
  getPosts,
  getPostsByCategory,
  getPost,
  putPost,
  postPost,
  postVote,
  deletePost
} from "utils/api"

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

export const fetchPost = id => {
  if (id) {
    return dispatch => {
      getPost(id).then(response => {
        dispatch({ type: FETCH_POST, post: response.data })
      })
    }
  }
}

export const rankPost = ( id, rank ) => {
  return dispatch => {
    postVote( id, rank ).then(response => {
      dispatch({ type: VOTE_POST, post: response.data })
    })
  }
}

export const removePost = (id) => {
  return dispatch => {
    deletePost(id).then(response => {
      dispatch({ type: DELETE_POST, post: response.data })
      alert("Post deleted")
    })
  }
}

export const addPost = (post, history) => {
  if (post) {
    return dispatch => {
      postPost(post).then(response => {
        dispatch({ type: ADD_POST, post: response.data })
        alert("Post created")
        history.push('/posts')
      })
    }
  }
}

export const editPost = (post, history) => {
  if (post && post.id) {
    return dispatch => {
      const goTo = `/post/${post.id}`
      putPost(post)
        .then(response => {
          dispatch({ type: EDIT_POST, post: response.data })
          alert("Post edited")
          history.push(goTo)
      })
    }
  }
}
