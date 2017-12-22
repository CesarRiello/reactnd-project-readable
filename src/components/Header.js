import React, { Component } from 'react'
class Header extends Component {

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
      </div>
    </nav>
  )
}

export default Header
