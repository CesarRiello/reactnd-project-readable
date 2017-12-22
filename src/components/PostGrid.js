import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { timestampToDate } from 'utils/date'

const orderPosts = (posts, orderBy) =>
  [...posts].sort(() => (orderBy))

const filterPosts = posts =>
  (posts || []).filter(post => !post.deleted)

const preparePosts = (posts, orderBy) => (
  orderPosts(filterPosts(posts), orderBy).map(post => (
    {...post,
      link:`/${post.category}/${post.id}`,
      date: timestampToDate(post.timestamp)}
    ))
)

const confirmRemovePost = (id, callback) => {
  if (window.confirm("You realy want delete this"))
    callback(id, (message) => {alert(message)})
}

const PostGrid = ({ posts, orderBy, votePost, deletePost, rankPost }) => {
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
              <p>Author: {post.author}</p>

              <hr />
              <div className="row">
                <div className="col-md-12">
                  <div className="button-group pull-left"> Rank: ({post.voteScore})
                    <button className="btn" onClick={() => { rankPost( post.id, 'upVote') }}>
                      <span role="img" aria-label="tumbs up">👍</span>
                    </button>
                    <button className="btn" onClick={() => { rankPost( post.id, 'downVote') }}>
                      <span role="img" aria-label="tumbs down">👎</span>
                    </button>
                  </div>
                  <div  className="button-group pull-right">
                    <Link className="btn" to={`/post/edit/${post.id}`}>
                      <span role="img" aria-label="edit">✍</span>
                    </Link>
                    <button className="btn" onClick={() => { confirmRemovePost(post.id, deletePost) }}>
                      <span role="img" aria-label="trash">🗑</span>
                    </button>
                  </div>
                </div>
              </div>
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

export default connect(mapStateToProps)(PostGrid)
