import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comments from 'components/Comments'
import { postsActions, commentsActions } from 'actions'
import { Link } from 'react-router-dom'

import Header from 'components/Header'

class Post extends Component {
  componentDidMount() {
    const id = ((this.props.match || {}).params || {}).id
    console.log(id);

    this.props.dispatch(postsActions.fetchPost(id))
    //this.props.postAction.fetchPost(this.props.match.params.id)
    this.props.dispatch(commentsActions.fetchComments(id))
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.postAction.fetchPost(nextProps.match.params.id)
    }
  }
  render() {
    const { title, body, author, category, timestamp, voteScore, comments, id } = this.props.post
    const date = new Date(timestamp)
    return [
      <Header key="header" />,
      <div className="container" key="post">

        <div className="blog-header">
          <h1 className="blog-title">{title}</h1>
        </div>

        <div className="row">
          <div className="col-sm-12 blog-main">

            <div className="blog-post">

              <p className="blog-post-meta">
                {'calendar'} by {author}
              </p>

              <p className="blog-post-meta">
                Category: {category}
              </p>

              {!!body && (<p className="post">{body}</p>)}
              <hr />

              <div basic size='mini'>
                <button icon={'like outline'} content={'Like'} onClick={() => { this.props.votePost({ id: id, vote: 'upVote' }) }}></button>
                <button label={<label>{voteScore}</label>} onClick={() => { this.props.votePost({ id: id, vote: 'downVote' }) }} icon={'dislike outline'} content={'dislike'}></button>
              </div>
              <div basic size='mini'>
                {<button as={Link} to={`/post/${id}`}><i name={'edit outline'} />Edit</button>}
                <button onClick={() => { this.props.deletePost({ postId: id, category: this.props.match.params.category }) }}><i name={'trash outline'} />Delete</button>
              </div>
            </div>
          </div>
        </div>
    </div>,

    <div className="container" key="comments">
      <Comments items={comments} parentId={id} />
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
