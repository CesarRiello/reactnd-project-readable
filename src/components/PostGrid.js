import React from 'react'
import { connect } from 'react-redux'
import { postsActions } from '../actions'
import { Link } from 'react-router-dom'

const orderPosts = (posts, orderBy) =>
  [...posts].sort(() => (orderBy))

const filterPosts = posts =>
  (posts || []).filter(post => !post.deleted)

const preparePosts = (posts, orderBy) => (
  orderPosts(filterPosts(posts), orderBy).map(post =>
    ({...post,
      date: new Date(post.timestamp),
      link:`/${post.category}/${post.id}` }))
)


const PostGrid = ({ posts, orderBy, votePost, deletePost }) => {
  return (
    <div className="row">
      {preparePosts(posts, orderBy).map(post => (

        <div className="col-sm-6 col-md-4" key={post.id}>
          <div className="thumbnail">
            <div className="caption">
              <Link to={post.link} >
                <h3>{post.title}</h3>
                <p>{post.body.substring(0, 100)}...</p>
              </Link>
              <p>Category: <span className="label label-default">{post.category}</span> </p>
              <p>Date: {post.date}</p>
              <p>Rank: {post.voteScore}</p>
              <p>Author: {post.author}</p>
            </div>
          </div>
        </div>
      ))}

    </div>

  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    votePost: ({ id, vote }) => {
      dispatch(postsActions.votePost({ postId: id, vote }))
    },
    deletePost: ({ postId }) => {
      dispatch(postsActions.deletePost({ postId }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostGrid)
