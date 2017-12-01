import React, { Component } from 'react'
import { getCategories } from '../utils/Rest'
class Header extends Component {
  state = {
    categories: []
  }

  fetchCategories = () => {
    getCategories()
    .then(response => {
      this.setState({categories: ((response || {}).data || {}).categories})
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount() {
  //  this.fetchCategories()
  }

  render = () => (
  <nav className="navbar navbar-inverse navbar-static-top">
    <div className="container">
      <input type="checkbox" id="menu-mobile" className="hidden menu-mobile-toggle" />
      <div className="navbar-header">
        <label htmlFor="menu-mobile" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </label>
        <a className="navbar-brand" href="/">Readable</a>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          {this.state.categories.map(category => (
            <li key={category.path} ><a href={`/${category.path}`}>{category.name}</a></li>
          ))}
        </ul>
      </div>
        </div>
    </nav>
)
}

export default Header
