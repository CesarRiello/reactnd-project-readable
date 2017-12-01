import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Container, Button, Icon, Label } from 'semantic-ui-react'
import Comments from '../components/Comments'
import { postsActions, commentsActions } from '../actions'
import { Link } from 'react-router-dom'

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
    const date = moment(timestamp).calendar()
    return [

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

              <Button.Group basic size='mini'>
                <Button icon={'like outline'} content={'Like'} onClick={() => { this.props.votePost({ id: id, vote: 'upVote' }) }}></Button>
                <Button label={<Label>{voteScore}</Label>} onClick={() => { this.props.votePost({ id: id, vote: 'downVote' }) }} icon={'dislike outline'} content={'dislike'}></Button>
              </Button.Group>
              <Button.Group basic size='mini'>
                {<Button as={Link} to={`/post/${id}`}><Icon name={'edit outline'} />Edit</Button>}
                <Button onClick={() => { this.props.deletePost({ postId: id, category: this.props.match.params.category }) }}><Icon name={'trash outline'} />Delete</Button>
              </Button.Group>
            </div>
          </div>
        </div>
    </div>,

      <Container key="comments">
        <Comments items={comments} parentId={id} />
      </Container>
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
