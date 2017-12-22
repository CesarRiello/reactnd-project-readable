import React, { Component } from 'react'
import { commentsActions } from '../actions'
import { connect } from 'react-redux'
import { timestampToDate } from 'utils/date'
import { orderByKey } from 'utils/array'

const initialComment = {
  id: null,
  parentId: null,
  author: "",
  body: ""
}

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: {...initialComment},
      errors: {},
      edit: {}
    }
  }

  hasErrorCommentFields = comment => {
    let errors = {}

    if (!comment.author) {
      const author = "the author name is invalid"
      errors = { ...errors, author }
    }

    if (!comment.body) {
      const body = "the comment is invalid"
      errors = { ...errors, body }
    }

    this.setState({errors})

    return !!Object.keys(errors).length
  }

  handleChange = event => {
    let errors = { ...this.state.errors }
    errors[event.target.name] = ""
    this.setState({errors})

    let comment = { ...this.state.comment }
    comment[event.target.name] = event.target.value
    this.setState({comment})
  }

  handleSubmit = (e, parentId) => {
    e.preventDefault()

    if (this.hasErrorCommentFields(this.state.comment)) {
      return false
    }

    const data = {...this.state.comment, parentId}
    if (this.state.comment.id) {
      this.props.dispatch(commentsActions.editComment(data))
    } else {
      this.props.dispatch(commentsActions.addComment(data))
      this.setState({ comment: { ...initialComment } })
    }
  }

  handleEditComment = (comment) => {
    this.setState({ edit: {} })
    this.props.editComment(comment)
  }

  editComment = (comment) => {
    const _comment = {...comment, body: prompt(`author ${comment.author}`, comment.body)}
    if (_comment.body) {
      this.props.dispatch(commentsActions.editComment(_comment))
    }
  }

  removeComment = (id) => {
    if (window.confirm("You realy want delete this comment")) {
      this.props.dispatch(commentsActions.removeComment(id))
    }
  }

  prepareComments = (items) => {
    return (items || [])
      .filter(comment => !comment.parentDeleted && !comment.deleted )
  }

  renderComment = (comment) => (
      <div className="panel panel-primary" key={comment.id}>
        <div className="panel-heading">
          {comment.author}
          <span className="pull-right">
            Rank: ({comment.voteScore}) {' '}
            Date: {timestampToDate(comment.timestamp)}
          </span>
        </div>
        <div className="panel-body">
          {comment.body}
        </div>
        <div className="panel-footer">
          <button className="btn" onClick={() => { this.props.dispatch(commentsActions.voteComment(comment.id, 'upVote')) }}>
            <span role="img" aria-label="tumbs up">👍</span>
          </button>
          <button className="btn" onClick={() => { this.props.dispatch(commentsActions.voteComment(comment.id, 'downVote')) }}>
            <span role="img" aria-label="tumbs down">👎</span>
          </button>
          <button className="btn" onClick={() => { this.editComment(comment) }}>
            <span role="img" aria-label="edit">✍</span>
          </button>
          <button className="btn" onClick={() => {this.removeComment(comment.id)}}>
            <span role="img" aria-label="trash">🗑</span>
          </button>
        </div>
      </div>
  )

  renderCommentForm = (id) => (

    <form key="form-new-comment" onSubmit={(event) => this.handleSubmit(event, id)}>

      <div className={this.state.errors.author ? 'has-error form-group' : 'form-group'}>
        <label htmlFor="author" className="control-label">
          Name
        </label>
        <input
          type="text"
          onChange={this.handleChange}
          className="form-control"
          id="author"
          name="author"
          value={this.state.comment.author}
          placeholder="comment author"
        />
        {this.state.errors.author &&
          <small className="help-block" >{this.state.errors.author}</small>}
      </div>

      <div className={this.state.errors.body ? 'has-error form-group' : 'form-group'}>
        <label className="control-label " htmlFor="body">
          Comment
        </label>
        <textarea
          className="form-control"
          onChange={this.handleChange}
          cols="40"
          id="body"
          name="body"
          rows="7"
          value={this.state.comment.body}
        />
        {this.state.errors.body &&
          <small className="help-block" >{this.state.errors.body}</small>}
      </div>

      <button type="submit" className="btn btn-default">
        Submit
      </button>
    </form>

  )

  render() {
    const { items, parentId } = this.props
    const comments = this.prepareComments(items)
    return (
      <div className="container">
        <div className="row">
          <h4>Comments ({(comments || []).length})</h4>
          {orderByKey(comments, 'voteScore').reverse().map(comment => {
            return this.renderComment(comment)
          })}
        </div>
        <div className="row">
          {this.renderCommentForm(parentId)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(Comments)
