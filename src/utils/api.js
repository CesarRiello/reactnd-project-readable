import axios from "axios"
import uuidv1 from "uuid/v1"

axios.defaults.baseURL = "http://127.0.0.1:3001"
axios.defaults.headers.common["Authorization"] = "project-readable"
axios.defaults.headers.post["Content-Type"] = "application/json"

const getCategories = () => axios.get(`categories`)

const getPost = id => axios.get(`/posts/${id}`)

const getPosts = () => {
  console.log('rst getPosts');
  return axios.get("/posts")
}

const getPostsByCategory = (category = "") => axios.get(`/${category}/posts`)

const putPost = data => {
  const { title = "", body = "", id = "" } = data || {}
  if (!title) delete data.title
  if (!body) delete data.body
  delete data.id
  return axios.put(`/posts/${id}`, data).catch(function(error) {
    console.log(error)
  })
}

const deletePost = ( id ) => {
  return axios.delete(`/posts/${id}`).catch(function(error) {
    console.log(error)
  })
}

const postPost = ({ title, body, author, category }) => {
  const timestamp = Date.now()
  const id = uuidv1()

  const data = { id, timestamp, title, body, author, category }

  return axios.post(`/posts`, data).catch(function(error) {
    console.log(error)
  })
}

const postVote = ( id, rank ) => {
  const option = rank === "downVote" ? "downVote" : "upVote"
  return axios.post(`/posts/${id}`, { option })
}

const getComments = id => axios.get(`/posts/${id}/comments`)

const postVoteComment = (id, rank) => {
  const option = rank === "upVote" || rank === "downVote" ? rank : ""
  return axios.post(`/comments/${id}`, { option })
}

const deleteComment = (id) => {
  return axios.delete(`/comments/${id}`)
}

const putComment = ({id = "", body = ""}) => {
  const data = {}
  data.body = body
  data.timestamp = Date.now()
  return axios.put(`/comments/${id}`, data).catch(function(error) {
    console.log(error)
  })
}

const postComment = ({body, author, parentId}) => {
  const timestamp = Date.now()
  const id = uuidv1()

  const data = { id, timestamp, body, author, parentId }

  return axios.post(`/comments`, data).catch(function(error) {
    console.log(error)
  })
}

export {
  getComments,
  postComment,
  putComment,
  postVoteComment,
  postPost,
  putPost,
  deletePost,
  deleteComment,
  getPost,
  postVote,
  getPosts,
  getPostsByCategory,
  getCategories
}
