import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostGrid from 'components/PostGrid'
import { postsActions, categoriesActions } from '../actions'
import { Link } from 'react-router-dom'
import { orderByKey } from 'utils/array'

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
    // this.props.dispatch(postsActions.fetchPosts(this.state.postsOrderBy))
    this.props.dispatch(categoriesActions.fetchCategories())
  }

  componentWillReceiveProps(nextProps) {
    const category = ((this.props.match || {}).params || {}).category
    const nextCategory = ((nextProps.match || {}).params || {}).category

    console.log(nextCategory);
    if (category) {
      if (nextCategory !== category) {
        this.props.dispatch(postsActions.fetchPostsByCategory(nextCategory, this.state.postsOrderBy))
      }
    } else {
      this.props.dispatch(postsActions.fetchPosts(this.state.postsOrderBy))
    }
  }

  orderPosts = (orderBy) => {
    if (orderBy === this.state.postsOrderBy)
      return

    this.setState({postsOrderBy: orderBy})

    const direction = ((orderBy || '').indexOf('-') === 0) ? -1 : 1
    const key = (orderBy || '').replace('-', '')


    const orderedPost = orderByKey(this.props.posts, key, direction)

    this.props.dispatch(({ type: postsActions.FETCH_POSTS, posts: orderedPost }))
  }

  render() {
    const selectedCategory = ((this.props.match || {}).params || {}).category
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

                      <label
                        htmlFor="toggleOrder"
                        onClick={() => { this.orderPosts(order.value) }}
                        className={`btn btn-link ${this.state.postsOrderBy === order.value ? 'selected' : ''}`}
                        >
                        <span>{order.label}</span>
                      </label>

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
                        <a
                          href={`/${category.path}`}
                          className={`link ${selectedCategory === category.path ? 'selected' : ''}`}
                          alt={`/${category.name}`}>
                          {category.name}
                        </a>
                    </li>
                  )}

                  {selectedCategory && <li key="none">
                  <a
                    className="link"
                    href="/"
                    >See all</a>
                  </li>}
                </ul>
              </div>

              <Link type="button" className="btn btn-default" to="/post/new">New post</Link>
            </div>
          </div>
        </div>

        <PostGrid
          posts={this.props.posts}
          postsOrderBy={this.state.postsOrderBy}
          selectedCategory={selectedCategory}
         />
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
