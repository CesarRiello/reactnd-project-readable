import React, { Component } from 'react'
import moment from 'moment'
import { commentsActions } from '../actions'
import { connect } from 'react-redux'
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react'

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
  render() {
    const { items, parentId } = this.props
    const comments = (items || []).filter(comment => !comment.deleted && !comment.parentDeleted)
    return (
        !!this.props.messages.length && (<Container>
        <WrapperMessages>
          {this.props.messages.map((message) => {
            return (<Message warning={message.warning}>
              <Message.Header>{message.title}</Message.Header>
              <p>{message.description}</p>
            </Message>)
          })}
        </WrapperMessages>
      </Container>)

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
