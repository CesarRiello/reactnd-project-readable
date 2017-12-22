import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comments from 'components/Comments'
import { postsActions, commentsActions } from 'actions'
import { Link } from 'react-router-dom'
import { timestampToDate } from 'utils/date'

import Header from 'components/Header'

class Post extends Component {
  componentDidMount() {
    const id = ((this.props.match || {}).params || {}).id
    if(id) {
      this.props.dispatch(postsActions.fetchPost(id))
      this.props.dispatch(commentsActions.fetchComments(id))
    }
  }

  removePost = (id) => {
    if (window.confirm("You realy want delete this post"))
      this.props.dispatch(postsActions.removePost(id, (message) => {alert(message)}))
  }

  render() {
    const {
      author,
      body,
      category,
      comments,
      id,
      title,
      timestamp,
      voteScore
    } = this.props.post

    return [
      <Header key="header" categories={this.props.categories} />,
      <div className="container" key="post">
        <div className="thumbnail">
          <div className="caption">
            <div className="blog-header">
              <h1 className="blog-title">{title}</h1>
            </div>

            <div className="row">
              <div className="col-sm-12 blog-main">

                <div className="blog-post">

                  <p className="blog-post-meta">
                    Author: {author}  -
                    Date: {timestampToDate(timestamp)} -
                    Category: <span className="badge"> {category} </span>
                  </p>

                  {!!body && (<p className="post">{body}</p>)}
                  <hr />

                  <div className="button-group pull-left"> Rank: ({voteScore})
                    <button className="btn" onClick={() => {
                      this.props.dispatch(postsActions.rankPost( id, 'upVote'))
                    }}>
                      <span role="img" aria-label="tumbs up">👍</span>
                    </button>
                    <button className="btn" onClick={() => {
                      this.props.dispatch(postsActions.rankPost( id, 'downVote'))
                    }}>
                      <span role="img" aria-label="tumbs down">👎</span>
                    </button>
                  </div>
                  <div  className="button-group pull-right">
                    <Link className="btn" to={`/post/edit/${id}`}>
                      <span role="img" aria-label="edit">✍</span>
                    </Link>
                    <button className="btn" onClick={() => { this.removePost(id) }}>
                      <span role="img" aria-label="trash">🗑</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>,

    <div className="container" key="comments">
      {comments &&
        <Comments items={comments} parentId={id} />}
    </div>
    ]
  }
}

const mapStateToProps = state => {
  return {
    post: state.post,
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Post)
