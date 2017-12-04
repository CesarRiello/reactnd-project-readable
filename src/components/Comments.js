import React, { Component } from 'react'
import { commentsActions } from '../actions'
import { connect } from 'react-redux'
import { timestampToDate } from 'utils/date'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        body: '',
        author: ''
      },
      edit: {}
    }
  }

  handleChange = (field, value) => {
    if (field === 'edit') {
      return this.setState((state) => (
        { edit: { ...state.edit, body: value } }
      ))
    }
    this.setState((state) => ({ ...state, form: { ...state.form, [field]: value } }))
  }

  handleSubmit = (parentId) => {
    const data = { parentId, ...this.state.form }
    this.props.addComment(data)
    this.setState(state => {
      return {
        ...state,
        form: {
          body: '',
          author: ''
        }
      }
    })
  }

  handleEditComment = (comment) => {
    this.setState({ edit: {} })
    this.props.editComment(comment)
  }

  editComment = (comment) => {
    this.setState({ edit: comment })
  }

  prepareComments = (items) => {
    return (items || [])
      .filter(comment => !comment.parentDeleted && !comment.deleted )
  }

  renderComment = (comment) => (
      <div className="panel panel-primary" key={comment.id}>
        <div class="panel-heading">
          {comment.author}
          <span className="pull-right">
            Rank: ({comment.voteScore}) {' '}
            Date: {timestampToDate(comment.timestamp)}
          </span>
        </div>
        <div class="panel-body">
          {comment.body}
        </div>
        <div class="panel-footer">
          <button className="btn-link" onClick={() => { this.props.voteComment({ id: comment.id, vote: 'upVote' }) }}>
            👍
          </button>
          <button className="btn-link" onClick={() => { this.props.voteComment({ id: comment.id, vote: 'downVote' }) }}>
            👎
          </button>
          <button className="btn-link" onClick={() => { this.putComment(comment) }}>
            ✍
          </button>
          <button className="btn-link" onClick={() => { this.props.deleteComment({ id: comment.id }) }}>
            🗑
          </button>
        </div>
      </div>
  )

  renderCommentForm = (comment) => (
    <main key={comment.id}>
      <div>
        <p>
          <i name="user" /> {comment.author}
        </p>
        <div>
          <div><i name={'like outline'} /> {comment.voteScore} Likes</div>
          <div>{new Date(comment.timestamp)}</div>
        </div>
        <form reply onSubmit={() => { this.handleEditComment(this.state.edit) }}>
          <textarea required label="Comment" value={this.state.edit.body} onChange={(e) => { this.handleChange('edit', e.target.value) }} />
          <button content='Save Comment' labelPosition='left' icon='edit' primary />
        </form>
        <div>
          <button onClick={() => { this.props.voteComment({ id: comment.id, vote: 'upVote' }) }}><i name={'like outline'} />Like</button>
          <button onClick={() => { this.props.voteComment({ id: comment.id, vote: 'downVote' }) }}><i name={'dislike outline'} />Dislike</button>
          <button onClick={() => { this.editComment(comment) }}><i name={'edit outline'} />Edit</button>
          <button onClick={() => { this.props.deleteComment({ id: comment.id }) }}><i name={'trash outline'} />Delete</button>
        </div>
      </div>
    </main>
  )

  renderNewCommentForm = (parentId) => (
    <form reply onSubmit={() => { this.handleSubmit(parentId) }}>
      <input required label='Name' type='text' value={this.state.form.author} onChange={(e) => { this.handleChange('author', e.target.value) }} />
      <textarea required label="Comment" value={this.state.form.body} onChange={(e) => { this.handleChange('body', e.target.value) }} />
      <button content='Add Comment' labelPosition='left' icon='edit' primary />
    </form>
  )

  render() {
    const { items, postId, commentId } = this.props
    const comments = this.prepareComments(items)
    return (
      <div className="row">
        <h4>Comments</h4>
        {comments.map(comment => {
          if (commentId === comment.id) {
            return this.renderCommentForm(comment)
          }
          return this.renderComment(comment)
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    addComment: (postId = '') => {
      dispatch(commentsActions.addComment(postId))
    },
    voteComment: ({ id, vote }) => {
      dispatch(commentsActions.voteComment({ id, vote }))
    },
    deleteComment: ({ id }) => {
      dispatch(commentsActions.deleteComment({ id }))
    },
    editComment: ({ id, body }) => {
      dispatch(commentsActions.editComment({ id, body }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
