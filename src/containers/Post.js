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
    this.props.dispatch(postsActions.fetchPost(id))
    this.props.dispatch(commentsActions.fetchComments(id))
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.postAction.fetchPost(nextProps.match.params.id)
    }
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

              <div basic size='mini'> ({voteScore})
                <button onClick={() => { this.props.votePost({ id: id, vote: 'upVote' }) }}>
                  👍
                </button>
                <button onClick={() => { this.props.votePost({ id: id, vote: 'downVote' }) }} >
                  👎
                </button>
              </div>
              <div basic size='mini'>
                {<button as={Link} to={`/post/${id}`}>
                  ✍
                 </button>}
                 <button onClick={() => { this.props.deletePost({ postId: id, category: this.props.match.params.category }) }}>
                  🗑
                 </button>
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
