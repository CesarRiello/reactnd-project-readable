import React, { Component } from "react"
import { connect } from "react-redux"
import { postsActions, categoriesActions } from "../actions"

const initialPost = {
  id: null,
  title: "",
  author: "",
  category: "",
  body: ""
}

class NewPost extends Component {
  constructor() {
    super()

    this.state = {
      action: "create",
      categories: [],
      errors: {},
      post: { ...initialPost }
    }
  }

  componentDidMount() {
    this.props.dispatch(categoriesActions.fetchCategories())
    if( this.props.match.params.id) {
      this.props.dispatch(postsActions.fetchPost(this.props.match.params.id))
    }
    console.log("this.props", this.props)
  }

  hasErrorPostFields = post => {
    let errors = {}

    if (!post.title) {
      const title = "the title is invalid"
      errors = { ...errors, title }
    }

    if (!post.author) {
      const author = "the author is invalid"
      errors = { ...errors, author }
    }

    if (!post.category) {
      const category = "the category is invalid"
      errors = { ...errors, category }
    }

    if (!post.body) {
      const body = "the body is invalid"
      errors = { ...errors, body }
    }

    this.setState({errors})

    return !!Object.keys(errors).length
  }

  handleChange = event => {
    let errors = { ...this.state.errors }
    errors[event.target.name] = ""
    this.setState({errors})

    let post = { ...this.state.post }
    post[event.target.name] = event.target.value
    this.setState({post})
  }

  handleSubmit = (e, message) => {
    e.preventDefault()

    if (this.hasErrorPostFields(this.state.post)) {
      return false
    }

    if (this.state.post.id) {
      this.props.dispatch(postsActions.putPost(this.state.post))
    } else {
      this.props.dispatch(postsActions.postPost(this.state.post))
      this.setState({ post: { ...initialPost } })
    }
  }

  render() {
    return (
      <div className="container">
        <form key="form-new-post" onSubmit={this.handleSubmit}>

          <div className={this.state.errors.title ? 'has-error form-group' : 'form-group'}>
            <label htmlFor="title" className="control-label">
              Title
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="title"
              name="title"
              value={this.state.post.title}
              placeholder="post title"
            />
            {this.state.errors.title &&
              <small className="help-block" >{this.state.errors.title}</small>}
          </div>

          <div className={this.state.errors.author ? 'has-error form-group' : 'form-group'}>
            <label htmlFor="author" className="control-label">
              Author
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="author"
              name="author"
              value={this.state.post.author}
              placeholder=" post author"
            />
            {this.state.errors.author &&
              <small className="help-block" >{this.state.errors.author}</small>}
          </div>

          <div className={this.state.errors.category ? 'has-error form-group' : 'form-group'}>
            <label htmlFor="categories" className="control-label">
              Categories
            </label>
            <select
              className="form-control"
              onChange={this.handleChange}
              name="category"
              id="category"
              value={this.state.post.category}
            >
              {((this.props.categories || {}).items || []).map(category => (
                <option value={category.path}>{category.name}</option>
              ))}
            </select>
            {this.state.errors.category &&
              <small className="help-block" >{this.state.errors.category}</small>}
          </div>

          <div className={this.state.errors.body ? 'has-error form-group' : 'form-group'}>
            <label className="control-label " htmlFor="body">
              Post
            </label>
            <textarea
              className="form-control"
              onChange={this.handleChange}
              cols="40"
              id="body"
              name="body"
              rows="7"
              value={this.state.post.body}
            />
            {this.state.errors.body &&
              <small className="help-block" >{this.state.errors.body}</small>}
          </div>

          <button type="submit" className="btn btn-default">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    post: state.post,
    notification: state.notification
  }
}

export default connect(mapStateToProps)(NewPost)
