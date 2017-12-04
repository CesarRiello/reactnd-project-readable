import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostGrid from '../components/PostGrid'
import { postsActions, categoriesActions } from '../actions'
import { Link } from 'react-router-dom'

import Header from 'components/Header'

class Posts extends Component {
  state = {
    postsOrderBy: '-voteScore',
    orderOption: [
      { value: "-voteScore", label: "Top Rank" },
      { value: "voteScore", label: "Low Rank" },
      { value: "-timestamp", label: "Latest posts" },
      { value: "timestamp", label: "Oldest posts" }
    ]
  }

  componentDidMount() {
    this.props.dispatch(postsActions.fetchPosts(this.state.postsOrderBy))
    this.props.dispatch(categoriesActions.fetchCategories())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      this.props.postsActions.fetchPostsByCategory(nextProps.match.params.category, this.state.postsOrderBy)
    }
  }

  orderPosts = (orderBy) => {
    if (orderBy === this.state.postsOrderBy)
      return

    const direction = ((orderBy || '').indexOf('-') === 0) ? -1 : 1
    const key = (orderBy || '').replace('-', '')

    const orderedPost = [...this.props.posts].sort((current, next) => {
        if (current[key] < next[key])
         return -1 * direction;

        if (current[key] > next[key])
         return 1 * direction;

        return 0;
      })

    this.props.dispatch(({ type: postsActions.FETCH_POSTS, posts: orderedPost }))
  }

  updateForm = (field, value) => {
    this.setState((state) => {
      return { ...state, [field]: value }
    })
  }

  render() {
    const { name } = this.props.match.params
    return [
      <Header key="header" categories={this.props.categories} />,
      <div className="container" key="container">
        <div className="row">
          <div className="col-md-12">
            <div className="btn-group" role="group" aria-label="...">

              <div className="btn-group" role="group">
                <input type="checkbox" id="toggleOrder" className="hidden" />
                <label htmlFor="toggleOrder" className="btn btn-default dropdown-toggle">
                  Order Posts
                  <span className="caret"></span>
                </label>
                <ul className="dropdown-menu">
                  {this.state.orderOption
                    .map(order => (
                    <li key={order.label}>
                      <button href="#" className="btn-link" value={order.value} onClick={event => { this.updateForm('postsOrderBy', event.target.value) }} >
                        {order.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="btn-group" role="group">
                <input type="checkbox" id="toggleCategories" className="hidden" />
                <label htmlFor="toggleCategories" className="btn btn-default dropdown-toggle">
                  Filter by category
                  <span className="caret"></span>
                </label>
                <ul className="dropdown-menu">
                  {(this.props.categories || [])
                    .map(category =>
                      <li key={category.path}>
                        <a href={`/${category.path}`} className="btn-link" alt={`/${category.name}`}>
                          {category.name}
                        </a>
                    </li>
                  )}
                </ul>
              </div>

              <Link type="button" className="btn btn-default" to="/post/new">New post</Link>
            </div>
          </div>
        </div>

        <PostGrid
          posts={this.props.posts}
          postsOrderBy={this.state.postsOrderBy} />
      </div>
    ]
  }
}

const mapStateToProps = state => {
  console.log('state', state);
  return {
    categories: state.categories,
    posts: state.posts,
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Posts)
